import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Watermark from "./Watermark";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import logo from "../../assets/logo.png"
import { verifyToken } from "../../api-calls/apicalls";
import generatePDF from 'react-to-pdf';
import banner from "../../assets/banner.png"
function PdfDetails() {
  const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState("")
  const [windowWidth, setWindowWidth] = useState();

  const location = useLocation();
  const { template, clickedPdf } = location.state;

  const downloadRef = useRef();

  // console.log("template",template)
  console.log("cppp", clickedPdf)

  const navigate = useNavigate()



  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    const tempDoc = document.querySelectorAll(".react-pdf__Document");
    tempDoc.forEach((t) => {
      // t.style.display = "flex";
      // t.style.justifyContent = "center";
      t.style.display = "500px"
    });
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
      style.display = "none";
    });

    const tempCanvas = document.querySelectorAll(".react-pdf__Page__canvas");

    tempCanvas.forEach((t) => {
      t.style.border = "2px solid #999595";
      t.style.marginLeft = "25%";
    });
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const verifier = async () => {
      const verifiedTokenData = await verifyToken()

      if (verifiedTokenData?.message === "jwt expired") {
        return navigate("/");
      } else {
        return;
      }
    }

    verifier()

    template?.template_pdfs?.forEach((pdf) => {
      if (pdf._id === clickedPdf._id) {
        setPdfUrl(pdf?.url)
      }
    })



    const container = document.querySelector(".pdf-container");
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    if (container) {
      container.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      if (container) {
        container.removeEventListener("contextmenu", handleContextMenu);
      }
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: '0' }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="file-upload-temp-editor" />}
        <div className="col-md-10 p-5 vh-100"
         style={{ height:'90vh',overflowY:'auto' }}
        >


          <div
            className=' d-flex justify-content-center align-items-center'
            style={{
              height: "50%",
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover"
            }}>

            <h1 className="text-light"> {clickedPdf?.file_name}</h1>

          </div>


          <div className="mt-5">
            <div className="d-flex justify-content-end">
              {clickedPdf?.pdf_downloadable ?
                <button className="btn" style={{ background: "#FF6B6B", border: "2px solid #F5F5F5" }} onClick={() => generatePDF(downloadRef, { filename: `${clickedPdf?.file_name}` })}>
                  Download PDF
                </button>
                : ""}
            </div>
            <div className="pdf-container mt-5 mb-5" style={{ height: "500px", overflowY: "scroll" }} >
              <Document file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <div ref={downloadRef}>
                  {Array.from({ length: numPages }, (_, index) => (
                    <Page pageNumber={index + 1}
                      onLoadSuccess={removeTextLayerOffset}
                    >
                      {clickedPdf?.top_left_logo ? <img className="View_file_template_pdf_logo" src={logo} alt="logo" /> : ""}
                      {clickedPdf?.watermark ? <Watermark /> : ""}
                      {clickedPdf?.bottom_right_page_no ? <p className="View_file_template_pdf_page_no">Page {index + 1} of {numPages}</p> : ""}
                    </Page>

                  ))}
                </div>
              </Document>

              {/* <div className="mt-5 d-flex justify-content-center align-items-center">
          <button
            className="btn View_file_template_pdf_prev_btn"
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
              } else {
                return;
              }
            }}
          >
            Previous
          </button>
          <p className="ms-2 me-2">
            Page {pageNumber} of {numPages}
          </p>
          <button
            className="btn View_file_template_pdf_next_btn"
            onClick={() => {
              if (pageNumber === numPages) {
                return;
              } else {
                setPageNumber(pageNumber + 1);
              }
            }}
          >
            Next
          </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfDetails;