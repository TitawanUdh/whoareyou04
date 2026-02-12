import { Button, Image } from "react-bootstrap";
import { analyzeResult } from "../utils/analyzeResult";
import "./Result.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import ImgSunflower from "../components/assets/images/sunflower.png";
import ImgRose from "../components/assets/images/rose.png";
import ImgLavender from "../components/assets/images/lavender.png";
import ImgDaisy from "../components/assets/images/daisy.png";
import "../components/Result.css";

const Result = ({ answers, setAnswers }) => {
 ;

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

const saveToSheet = async (answers, result) => {
  const userId =
    localStorage.getItem("psychoUserId") ||
    Math.random().toString(36).substring(2);

  localStorage.setItem("psychoUserId", userId);

  await fetch("https://script.google.com/macros/s/AKfycbwIdkgA_7qGheoz1QgcPKn8_SpzGCMVN_2WFET-hQJHeGq1lQiZT8XQDpuuu4G_X807qw/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      answers,
      result,
    }),
  });
};

  const profile = useMemo(() => {
    const currentAnswers =
      answers?.length > 0 ? answers : savedResult?.rawAnswers || [];

    if (!currentAnswers.length) return null;
    return analyzeResult(currentAnswers);
  }, [answers, savedResult]);
  
useEffect(() => {
  if (!profile) return;

  const alreadySent = localStorage.getItem("sheet-sent");
  if (alreadySent) return;

  const finalAnswers =
    answers?.length ? answers : savedResult?.rawAnswers || [];

  saveToSheet(finalAnswers, profile.title);

  localStorage.setItem("sheet-sent", "true");
}, [profile, answers, savedResult]);


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
    localStorage.removeItem("sheet-sent");
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
            <h5 className="text-secondary">{profile?.subTitle}</h5>
          </div>

          <div className="d-flex justify-content-center">
            {profile?.title?.includes("ทานตะวัน") ? (
              <Image
                src={ImgSunflower}
                alt="Sunflower"
                className="result-image"
              />
            ) : profile?.title?.includes("กุหลาบ") ? (
              <Image src={ImgRose} alt="Rose" className="result-image" />
            ) : profile?.title?.includes("ลาเวนเดอร์") ? (
              <Image
                src={ImgLavender}
                alt="Lavender"
                className="result-image"
              />
            ) : (
              <Image src={ImgDaisy} alt="Daisy" className="result-image" />
            )}
          </div>

          <div className="mt-2">
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
