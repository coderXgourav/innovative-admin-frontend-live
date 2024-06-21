import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploadTempEditor from "./components/fileUploadTempEditor/fileUploadTempEditor";
import Dashboard from "./components/dashboard/dashboard";
import ViewFileTemplate from "./components/viewFileTemplate/viewFileTemplate";
import PdfDetails from "./components/viewFileTemplate/pdfDetails";
import McqTemplateEditor from "./components/mcqTemplateEditor/mcqTemplateEditor";
import ViewMcqTemplate from "./components/viewMcqTemplate/viewMcqTemplate";
import InvoiceManagement from "./components/invoiceManagement/invoiceManagement";
import UserManagement from "./components/userManagement/userManagement";
import PurchaseOrderManagement from "./components/purchaseOrderManagement/purchaseOrderManagement";
import QuizTemplateEditor from "./components/quizTemplateEditor/quizTemplateEditor";
import ViewQuizTemplate from "./components/viewQuizTemplate/viewQuizTemplate"
import FaqManagement from "./components/FaqManagement/FaqManagement";
import GalleryManagement from "./components/GalleryManagement/GalleryManagement";
import ProductManagement from "./components/productManagement/productManagement";
import CategoryManagement from "./components/categoryManagement/categoryManagement";
import TrainingModule from "./components/trainingModule/trainingModule";
import ChooseUsManagement from "./components/chooseUs/chooseUs";
import TestimonialManagement from "./components/testimonial/testimonial";
import ServiceManagement from "./components/serviceManagement/serviceManagement";
import PartnerManagement from "./components/partnerManagement/partnerManagement";
import Login from "./components/login/login";
import { useLogin } from "./context/loginContext";
import OurMissionManagement from "./components/ourMission/ourMission";
import OurVisionManagement from "./components/ourVision/ourVision";
import AboutUsManagement from "./components/aboutUs/aboutUs";
import CallUsManagement from "./components/callUs/callUs";
import EmailUsManagement from "./components/emailUs/emailUs";


function App() {
  const{loginValidity}=useLogin()
  useEffect(()=>{
// console.log("appp")
  },[])
  return (
    <>
   {/* {loginValidity===false && <Login/>}
   {loginValidity===true&& */}
   <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      {/* <Route exact path="/" element={<Dashboard />} /> */}
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/file-upload-temp-editor" element={< FileUploadTempEditor/>} />
      <Route exact path="/mcq-temp-editor" element={< McqTemplateEditor/>} />
      <Route exact path="/quiz-temp-editor" element={<QuizTemplateEditor />} />
      <Route exact path="/user-management" element={< UserManagement/>} />
      <Route exact path="/invoice-management" element={< InvoiceManagement/>} />
      <Route exact path="/purchase-order-management" element={< PurchaseOrderManagement/>} />
      <Route exact path="/view-file-template" element={<ViewFileTemplate />} />
      <Route exact path="/view-mcq-template" element={<ViewMcqTemplate />} />
      <Route exact path="/view-quiz-template" element={<ViewQuizTemplate />} />
      <Route exact path="/faq-management" element={<FaqManagement />} />
      <Route exact path="/gallery-management" element={<GalleryManagement />} />
      <Route exact path="/product-management" element={<ProductManagement />} />
      <Route exact path="/category-management" element={<CategoryManagement/>} />
      <Route path="/pdfDetails" element={<PdfDetails />} />
      <Route path="/training-module-management" element={<TrainingModule />} />
      <Route path="/choose-us-management" element={<ChooseUsManagement/>} />
      <Route path="/testimonial-management" element={<TestimonialManagement/>} />
      <Route path="/service-management" element={<ServiceManagement/>} />
      <Route path="/partner-management" element={<PartnerManagement/>} />
      <Route path="/our-mission-management" element={<OurMissionManagement/>} />
      <Route path="/our-vision-management" element={<OurVisionManagement/>} />
      <Route path="/about-us-management" element={<AboutUsManagement/>} />
      <Route path="/call-us-management" element={<CallUsManagement/>} />
      <Route path="/email-us-management" element={<EmailUsManagement/>} />
    </Routes>
   </Router>
   {/* } */}
   </>
  );
}

export default App;
