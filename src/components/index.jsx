import { useState } from "react"; // เพิ่ม useState
import { Link } from "react-router-dom"; // เพิ่ม useNavigate เพื่อการเปลี่ยนหน้าในแอปที่ลื่นไหล
import "../App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { SiGoogleearth } from "react-icons/si";
import { IoClose } from "react-icons/io5"; // เพิ่มไอคอนปิด (ถ้ามี)

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // สร้าง State สำหรับเปิด/ปิดเมนู
  const links = [
    {
      num: 1,
      title: "รู้จักตัวเอง",
      link: "https://whoyouare-01.vercel.app/",
      icon: <SiGoogleearth />,
    },
    {
      num: 2,
      title: "ด้านมืดในใจ",
      link: "https://whoyouare-02.vercel.app/",
      icon: <SiGoogleearth />,
    },
    {
      num: 3,
      title: "สีของจิตใจคุณ",
      link: "https://whoyouare-03.vercel.app/",
      icon: <SiGoogleearth />,
    },
    {
      num: 4,
      title: "ดอกไม้ในใจ",
      link: "https://whoyouare-04.vercel.app/",
      icon: <SiGoogleearth />,
    },
    {
      num: 5,
      title: "ติดต่อเราสร้างเกมของตัวเอง",
      link: "https://bio-whoyouare.vercel.app/detail-contact",
      icon: <FaHeart />,
    },
  ];

  const handleLinkClick = (href) => {
    if (!href) return;
    setIsMenuOpen(false); // ปิดเมนูหลังจากกดเลือก

   
      window.open(href, "_blank", "noopener,noreferrer");
    
  };

  return (
 <div className="App">
    {/* เมนูควรอยู่ชั้นนอกสุดแบบนี้ */}
    <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header" style={{textAlign: 'right'}}>
           <span onClick={() => setIsMenuOpen(false)} style={{color: 'white', fontSize: '30px'}}><IoClose /></span>
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

    {/* Overlay ต้องอยู่ข้างนอกเช่นกัน */}
    {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    
    {/* ส่วนอื่นๆ ของหน้าจอ */}
    <div className="menu-bar" onClick={() => setIsMenuOpen(true)}>
       <GiHamburgerMenu />
    </div>

      {/* 2. พื้นหลังและเนื้อหา (อยู่ข้างล่าง) */}
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />

      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h1 className="title">ดอกไม้ในใจ ?</h1>
        <p className="subtitle">
          ถ้าเปรียบตัวเองเป็นดอกไม้
          <br />
          คุณคือดอกไม้อะไร ?
        </p>
        <Link to="/question/1" className="start-button">
          เริ่ม
        </Link>
      </div>
    </div>
  );
}

export default Index;
