import { Button, Image } from "react-bootstrap";
import { analyzeResult } from "../utils/analyzeResult";
import "./Result.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import ImgHeart from "../components/assets/images/heart.png";
import ImgGrowth from "../components/assets/images/growth.png";
import ImgSurvival from "../components/assets/images/survival.png";
import "../components/Result.css";

const Result = ({ answers, setAnswers }) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const savedResult = useMemo(() => {
    try {
      const raw = localStorage.getItem("myself-result");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // แก้ไขจุดที่ 1: ย้ายการประกาศ currentAnswers เข้ามาข้างใน useMemo
  // และใส่ dependencies ให้ครบถ้วน
  const profile = useMemo(() => {
    const currentAnswers =
      answers?.length > 0 ? answers : savedResult?.rawAnswers || [];

    if (!currentAnswers.length) return null;
    return analyzeResult(currentAnswers);
  }, [answers, savedResult]);

  useEffect(() => {
    if (!answers?.length || !profile) return;

    const resultToSave = {
      profile,
      rawAnswers: answers,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("myself-result", JSON.stringify(resultToSave));
  }, [answers, profile]);

  const handleSaveImage = async () => {
    const element = document.getElementById("result-export-card");
    if (!element) return;

    setIsGenerating(true);

    const computedStyle = window.getComputedStyle(element);
    const currentBgColor = computedStyle.backgroundColor;

    element.classList.add("exporting");

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: currentBgColor,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector(".result-card");
          if (clonedCard) {
            clonedCard.style.background = "#ffffff";
            clonedCard.style.backdropFilter = "none";
            clonedCard.style.webkitBackdropFilter = "none";
            clonedCard.style.animation = "none";
          }
        },
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `result-${profile.group}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถบันทึกรูปได้");
    } finally {
      element.classList.remove("exporting");
      setIsGenerating(false);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem("myself-result");
    setAnswers([]);
    navigate("/");
  };

  if (!profile) return <p>กำลังวิเคราะห์ตัวตนของคุณ...</p>;

  return (
    <div id="result-export">
      <div
        className={`result-page-1 theme-${profile?.group}`}
        id="result-export-card"
      >
        <div className="result-card">
          <div className="result-header text-center">
            <p className="result-label">ตัวตนหลักของคุณคือ</p>
            <h2>{profile?.title}</h2>
          </div>

          <div className="d-flex justify-content-center my-3">
            {profile?.title?.includes("หัวใจ") ? (
              <Image
                src={ImgHeart}
                alt="Heart Trait"
                className="result-image"
              />
            ) : profile?.title?.includes("เติบโต") ? (
              <Image
                src={ImgGrowth}
                alt="Growth Trait"
                className="result-image"
              />
            ) : (
              <Image
                src={ImgSurvival}
                alt="Survival Trait"
                className="result-image"
              />
            )}
          </div>



 <div className="result-story">
            <p>{profile?.deep?.article}</p>
          </div>

          <div className="result-section">
            <h5>🕳 ความกลัวลึก ๆ</h5>
            <p>{profile?.psyche?.coreFear}</p>
          </div>

          <div className="result-section">
            <h5>🤍 ความต้องการที่ซ่อนอยู่</h5>
            <p>{profile?.psyche?.hiddenNeed}</p>
          </div>

          <div className="result-section">
            <h5>⚠️ เวลาคุณเครียด คุณจะ…</h5>
            <p>{profile?.psyche?.stressPattern}</p>
          </div>
<div className="result-section">
  <h5>🌷 จุดที่คุณควรอ่อนโยนกับตัวเอง</h5>
  <p>{profile?.deep?.gentleReminder}</p>
</div>

          <div className="result-actions no-export">
            <Button
              className="save-btn"
              onClick={handleSaveImage}
              disabled={isGenerating}
            >
              {isGenerating ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
            <Button className="restart-btn" onClick={handleRestart}>
              เริ่มใหม่
            </Button>
          </div>

          <div className="result-footer mt-4 text-center">
            <p style={{ fontSize: "0.8rem", color: "#666" }}>
              ผลลัพธ์นี้ไม่ใช่คำตัดสิน แต่เป็นกระจกสะท้อนตัวคุณ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
