import React from 'react';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const Sidebar = (props) => {
  const [activeOption, setActiveOption] = useState(props.activeOption);
  const navigate = useNavigate();
  const handleClick = (clickedItem) => {
    navigate(`/${clickedItem}`);
  };
  return (
    <div className='col-md-2 col-12 bg-dark py-4' style={{ height: "90vh", zIndex: "100",overflowY:'auto',position:'sticky',left:'0' }}>

      <a style={{ textDecoration: "none" }} href="/dashboard">
        <div className="row fw-bold text-white" style={activeOption === 'dashboard' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 '>Dashboard</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/user-management">
        <div className="row fw-bold text-white" style={activeOption === 'user-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 '>User Management</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/mcq-temp-editor">
        <div className="row fw-bold text-white" style={activeOption === 'mcq-template-editor' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 '>MCQ Template Editor</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/quiz-temp-editor">
        <div className="row fw-bold text-white" style={activeOption === 'quiz-template-editor' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 '>Quiz Template Editor</p>
        </div>
      </a>


      <a style={{ textDecoration: "none" }} href="/file-upload-temp-editor" >
        <div className="row fw-bold text-white" style={activeOption === 'file-upload-temp-editor' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 '>File Upload Temp Editor</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/invoice-management">
        <div className="row fw-bold text-white" style={activeOption === 'invoice-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 '>Invoice Management</p>
        </div>
      </a>


      <a style={{ textDecoration: "none" }} href="/purchase-order-management">
        <div className="row fw-bold text-white" style={activeOption === 'purchase-order-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Purchase Order Manage..</p>
        </div>
      </a>


      {/* <a style={{textDecoration: "none"}} href="/pages/document-center">
        <div className="row fw-bold text-white" style={activeOption==='document-center'?{backgroundColor: '#575655'}:{backgroundColor:"transparent"}}>
          <p className='px-3 pt-2 ms-4 me-2 '>Document Center</p>
        </div>
      </a>

      <a style={{textDecoration: "none"}} href="/pages/system-setting">
        <div className="row fw-bold text-white" style={activeOption==='system-setting'?{backgroundColor: '#575655'}:{backgroundColor:"transparent"}}>
          <p className='px-3 pt-2 ms-4 me-2 '>System Setting</p>
        </div>
      </a> */}





      <a style={{ textDecoration: "none" }} href="/faq-management">
        <div className="row fw-bold text-white" style={activeOption === 'faq-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Faq Management</p>
        </div>
      </a>





      <a style={{ textDecoration: "none" }} href="/gallery-management">
        <div className="row fw-bold text-white" style={activeOption === 'gallery-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Gallery Management</p>
        </div>
      </a>


      <a style={{ textDecoration: "none" }} href="/product-management">
        <div className="row fw-bold text-white" style={activeOption === 'product-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Product Management</p>
        </div>
      </a>


      <a style={{ textDecoration: "none" }} href="/category-management">
        <div className="row fw-bold text-white" style={activeOption === 'category-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Category Management</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/training-module-management">
        <div className="row fw-bold text-white" style={activeOption === 'training-module-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Training Module Management</p>
        </div>
      </a>



      <a style={{ textDecoration: "none" }} href="/choose-us-management">
        <div className="row fw-bold text-white" style={activeOption === 'choose-us-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Choose Us Management.</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/testimonial-management">
        <div className="row fw-bold text-white" style={activeOption === 'testimonial-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Testimonial Management</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/service-management">
        <div className="row fw-bold text-white" style={activeOption === 'service-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Service Management</p>
        </div>
      </a>


      <a style={{ textDecoration: "none" }} href="/partner-management">
        <div className="row fw-bold text-white" style={activeOption === 'partner-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>partner Management</p>
        </div>
      </a>

      

      <a style={{ textDecoration: "none" }} href="/our-mission-management">
        <div className="row fw-bold text-white" style={activeOption === 'our-mission-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Our Mission Management</p>
        </div>
      </a>

      <a style={{ textDecoration: "none" }} href="/our-vision-management">
        <div className="row fw-bold text-white" style={activeOption === 'our-vision-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Our Vision Management</p>
        </div>
      </a>
      <a style={{ textDecoration: "none" }} href="/about-us-management">
        <div className="row fw-bold text-white" style={activeOption === 'about-us-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>About Us Management</p>
        </div>
      </a>
      <a style={{ textDecoration: "none" }} href="/call-us-management">
        <div className="row fw-bold text-white" style={activeOption === 'call-us-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Call Us Management</p>
        </div>
      </a>
      <a style={{ textDecoration: "none" }} href="/email-us-management">
        <div className="row fw-bold text-white" style={activeOption === 'email-us-management' ? { backgroundColor: '#575655' } : { backgroundColor: "transparent" }}>
          <p className='px-3 pt-2 ms-4 me-2 ' style={{ whiteSpace: "nowrap" }}>Email Us Management</p>
        </div>
      </a>

      {/* <a style={{textDecoration: "none"}} href="/pages/logout">
        <div className="row fw-bold text-white" style={activeOption==='logout'?{backgroundColor: '#575655'}:{backgroundColor:"transparent"}}>
          <p className='px-3 pt-2 ms-4 me-2 '>Logout</p>
        </div>
      </a> */}
    </div>
  )
}

export default Sidebar