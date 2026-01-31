import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdsBook01 from "./assets/images/ads-book-1.jpg";

export default function LoadingResult() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase("dissolve"); // เริ่มสลาย
    }, 8000);

    const timer2 = setTimeout(() => {
      setPhase("reveal"); // ปุ่มใหม่โผล่
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCloseAds = () => {
    navigate("/result"); // เด้งไปหน้าถัดไป
  };
  return (
    <div className="loading-page d-flex flex-column justify-content-center align-items-center">
      {/* 🔹 โฆษณา */}
      {/* background effects */}
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />

      <div className="fog fog1" />
      <div className="fog fog2" />

      <div className="ad-box">
        <div className="d-flex justify-content-end">
          <span className="ads-label">
            {countdown > 0 ? (
              `${countdown}`
            ) : (
              <Button
                className="close-btn"
                variant="outline-light"
                onClick={handleCloseAds}
                aria-label="close"
              >
                ✕
              </Button>
            )}
          </span>{" "}
        </div>
        <h2 className="mt-3">ล้างสมอง ?</h2>
        <div className="d-flex justify-content-center my-3">
          <Image src={AdsBook01} alt="หนังสือล้างสมอง" className="ads-image" />
        </div>
        <p className="ads-text">
          {" "}
          หนังสือเล่มนี้จะพาคุณมองเห็น “ด้านที่มองไม่เห็น” ของจิตวิทยามนุษย์
          ตั้งแต่กลไกการชักจูง การควบคุมความคิด
          ไปจนถึงวิธีที่คนธรรมดาอาจถูกชี้นำโดยไม่รู้ตัว เมื่อเข้าใจมัน
          คุณจะเริ่มมองโลกและผู้คนได้ชัดขึ้นกว่าเดิม
        </p>
        <a
          href="https://s.shopee.co.th/8V30fx3mwy"
          target="_blank"
          rel="noopener noreferrer"
          className="ads-link"
        >
          <div className="d-flex justify-content-center my-3">
            <Button className="ads-button">ดูเพิ่มเติม</Button>
          </div>{" "}
        </a>
      </div>

      <div className="reveal-wrapper d-flex flex-column justify-content-center align-items-center pt-5">
        {phase === "loading" && (
          <>
            <div className="mystic-ring loading" />
            <div>กำลังประมวลผล…</div>
            <div className="countdown-text"> {countdown} </div>
          </>
        )}

        {phase === "dissolve" && (
          <div className="reveal-button dissolve">กำลังประมวลผล…</div>
        )}

        {phase === "reveal" && (
          <Button
            className="reveal-button reveal"
            onClick={() => navigate("/result")}
          >
            เผยความลับตัวตน
          </Button>
        )}
      </div>
    </div>
  );
}
