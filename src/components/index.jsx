import { Link } from 'react-router-dom'
import "../App.css";

function Index() {
  return (
     <div className="App">
  <div className="stars" />
  <div className="stars2" />
  <div className="stars3" />

  <div className="fog fog1" />
  <div className="fog fog2" />

  <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <h1 className="title">รู้จักตัวเองไหม ?</h1>

    <p className="subtitle ">
      ถ้าเปรียนตัวเองเป็นดอกไม้
      <br />
       คุณคือดอกไม้อะไร ?
    </p>

    <Link to="/question/1" className="start-button">
  เริ่ม
</Link>


  </div>
</div>
  )
}

export default Index
