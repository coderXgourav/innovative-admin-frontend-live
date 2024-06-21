import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png"
import "./viewFileTemplate.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { verifyToken } from '../../api-calls/apicalls';

function ViewFileTemplate() {
    const [windowWidth, setWindowWidth] = useState();
    const location = useLocation();
    const { templateData } = location.state;

    const navigate = useNavigate()

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleDownloadZip = (clickedZip) => {
        templateData?.template_zips?.forEach((zip) => {
            if (zip._id === clickedZip._id) {
                saveAs(zip?.url, `${zip?.file_name}`)
            }
        })
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);


        const verifier = async () => {
            const verifiedTokenData = await verifyToken()

            if (verifiedTokenData?.message === "jwt expired") {
                return navigate("/");
            } else {
                return;
            }
        }

        verifier()

        return () => {
            window.removeEventListener("resize", updateWindowWidth);
        };
    }, []);

    return (

        <div


        >
            <Nav />
            <hr style={{ color: "black", margin: '0' }} />
            <div className="row"

            >
                {windowWidth > 768 && <Sidebar activeOption="file-upload-temp-editor" />}
                <div className="col-md-10  p-4"
                    style={{ height: '90vh', overflowY: 'auto' }}
                >
                    <div
                        style={{
                            width: '100%',
                            backgroundImage: `url(${banner})`,

                        }}>
                        <div className='d-flex justify-content-center View_file_template_exam_name_main'>
                            <div className='View_file_template_exam_name_text'>
                                {templateData?.template_name}
                            </div>
                        </div>

                        <div className='d-flex justify-content-center View_file_template_exam_desc_main'>
                            <div className='d-flex justify-content-center View_file_template_exam_desc_text'>
                                {templateData?.template_desc}
                            </div>
                        </div>
                    </div>


                    <div className='mt-4 View_file_boxes'>
                        <h5 className='d-flex justify-content-center'>Pdfs</h5>
                        {templateData && templateData?.template_pdfs?.length !== 0 ?
                            templateData.template_pdfs.map((pdf) => (
                                <div className='mt-3 d-flex justify-content-center'>
                                    {pdf?.file_name}
                                    {/* <p className='ms-3'>watermark: {pdf?.watermark === true ? "on" : "off"}</p>
                                    <p className='ms-3'>top left logo: {pdf?.top_left_logo === true ? "on" : "off"}</p>
                                    <p className='ms-3'>bottom right page no: {pdf?.bottom_right_page_no === true ? "on" : "off"}</p>
                                    <p className='ms-3'>pdf downloadable: {pdf?.pdf_downloadable === true ? "on" : "off"}</p> */}
                                    <Link className='ms-3' to="/pdfDetails" state={{ template: templateData, clickedPdf: pdf }} >
                                        details
                                    </Link>
                                </div>
                            )) : <>no data</>
                        }
                    </div>

                    <div className='mt-5 View_file_boxes' >
                        <h5 className='d-flex justify-content-center'>Zips</h5>
                        <hr />
                        {templateData && templateData?.template_zips?.length !== 0 ?
                            templateData.template_zips.map((zip) => (
                                <div className='mt-3 d-flex justify-content-center'>

                                    {zip?.file_name}
                                    {/* <p className='ms-3'>zip downloadable: {zip?.zip_downloadable === true ? "on" : "off"}</p> */}
                                    <DownloadIcon className='ms-3' style={{ cursor: "pointer" }} onClick={() => { handleDownloadZip(zip) }} />
                                </div>
                            )) : <><p>no data</p> </>
                        }
                    </div>

                    <div className='mt-5 View_file_boxes'>
                        <h5 className='d-flex justify-content-center'>Links</h5>
                        {templateData && templateData?.template_links?.length !== 0 ?
                            templateData.template_links.map((link) => (
                                <div className='mt-3 d-flex justify-content-center'>
                                    {link?.link_preview_name}
                                    <a className='ms-3' style={{ cursor: "pointer " }} href={`${link?.link_url}`}> {link?.link_url}</a>
                                </div>
                            )) : <><p>no data</p></>
                        }
                    </div>
                </div>
            </div>



        </div>
    )
}

export default ViewFileTemplate