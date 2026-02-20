import React, { useState } from "react"; // เพิ่ม useState
import { Link, useNavigate } from "react-router-dom"; // เพิ่ม useNavigate เพื่อการเปลี่ยนหน้าในแอปที่ลื่นไหล
import "../App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { SiGoogleearth } from "react-icons/si";
import { IoClose } from "react-icons/io5"; // เพิ่มไอคอนปิด (ถ้ามี)

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // สร้าง State สำหรับเปิด/ปิดเมนู
  const navigate = useNavigate();

  const links = [
    { num: 1, title: "รู้จักตัวเอง", link: "https://whoyouare-01.vercel.app/", icon: <SiGoogleearth /> },
    { num: 2, title: "ด้านมืดในใจ", link: "https://whoyouare-02.vercel.app/", icon: <SiGoogleearth /> },
    { num: 3, title: "สีของจิตใจคุณ", link: "https://whoyouare-03.vercel.app/", icon: <SiGoogleearth /> },
    { num: 4, title: "ดอกไม้ในใจ", link: "https://whoyouare-04.vercel.app/", icon: <SiGoogleearth /> },
    { num: 5, title: "ติดต่อเราสร้างเกมของตัวเอง", link: "/detail-contact", icon: <FaHeart /> },
  ];

  const handleLinkClick = (href) => {
    if (!href) return;
    setIsMenuOpen(false); // ปิดเมนูหลังจากกดเลือก

    if (href.startsWith("/")) {
      navigate(href); // ใช้ navigate ของ react-router-dom แทน window.location เพื่อความเร็ว
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="App">
      {/* --- ส่วนของ Sidebar Menu --- */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h3>เมนู</h3>
          <span className="close-btn" onClick={() => setIsMenuOpen(false)}><IoClose /></span>
        </div>
        <div className="menu-list">
          {links.map((item) => (
            <div key={item.num} className="menu-item" onClick={() => handleLinkClick(item.link)}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Background Overlay เมื่อเปิดเมนู */}
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}

      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />
      
      <div className="menu-bar">
        {/* เปลี่ยนฟังก์ชันให้เป็นการเปิด Menu แทน */}
        <span onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer" }}>
          <GiHamburgerMenu />
        </span>
      </div>

      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h1 className="title">ดอกไม้ในใจ ?</h1>
        <p className="subtitle">
          ถ้าเปรียบตัวเองเป็นดอกไม้
          <br />
          คุณคือดอกไม้อะไร ?
        </p>
        <Link to="/question/1" className="start-button">เริ่ม</Link>
      </div>
    </div>
  );
}

export default Index;