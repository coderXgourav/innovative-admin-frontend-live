import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import {
  createTemplates,
  fetchTemplates,
  updateTemplates,
  deleteTemplates
} from "../../api-calls/apicalls";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png"

function FileUploadTempEditor() {
  const [windowWidth, setWindowWidth] = useState();
  const [templates, setTemplates] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  // const [templateCategory, setTemplateCategory] = useState("");
  const [templateDesc, setTemplateDesc] = useState("");
  const [templateImage, setTemplateImage] = useState();
  const [templatePdfs, setTemplatePdfs] = useState([]);
  const [templateZips, setTemplateZips] = useState([]);
  const [links, setLinks] = useState([]);
  const [pdfsCnt, setPdfsCnt] = useState([]);
  const [zipsCnt, setZipsCnt] = useState([]);
  const [update, setUpdate] = useState(false);
  const [dbPdfs, setDbPdfs] = useState([]);
  const [dbZips, setDbZips] = useState([]);
  const [dbLinks, setDbLinks] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [dbImage, setDbImage] = useState("")

  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const imageFileHandler = (e) => {
    let selectedImage = e.target.files[0];

    if (selectedImage.type !== "image/png") {
      alert("please select image");
      document.getElementById("add-image").value = "";
      return;
    }
    setTemplateImage(selectedImage);
  };

  const pdfFilesHandler = (e, ind) => {
    let selectedPdf = e.target.files[0];
    let tempTemplatePdfs = templatePdfs;

    if (selectedPdf.type !== "application/pdf") {
      alert("please select pdfs");
      document.getElementById(`add-pdfs-${ind}`).value = "";
      tempTemplatePdfs.splice(1, ind);
      return;
    } else {
      tempTemplatePdfs[ind] = selectedPdf;
    }

    // console.log("temppdfs",tempTemplatePdfs)
    setTemplatePdfs([...tempTemplatePdfs]);
  };

  const zipFilesHandler = (e, ind) => {
    let selectedZip = e.target.files[0];
    let tempTemplateZips = templateZips;

    if (selectedZip.type !== "application/x-zip-compressed") {
      alert("please select zips");
      document.getElementById(`add-zips-${ind}`).value = "";
      tempTemplateZips.splice(1, ind);
      return;
    } else {
      tempTemplateZips[ind] = selectedZip;
    }

    setTemplateZips([...tempTemplateZips]);
  };

  const handleLinks = () => {
    const tempLinks = links;
    tempLinks.push(links.length + 1);
    setLinks([...tempLinks]);
  };

  const handlePdfsInputCnt = () => {
    const tempPdfs = pdfsCnt;
    tempPdfs.push(pdfsCnt.length + 1);
    setPdfsCnt([...tempPdfs]);
  };

  const handleZipsInputCnt = () => {
    const tempZips = zipsCnt;
    tempZips.push(zipsCnt.length + 1);
    setZipsCnt([...tempZips]);
  };

  const handleSubBtns = (id) => {
    if (document.getElementById(`${id}`).value == "off") {
      document.getElementById(`${id}`).value = "on";
    } else {
      document.getElementById(`${id}`).value = "off";
    }
  };

  const handleCreate = async () => {
    let addData = new FormData();

    addData.append("template_name", templateName);
    addData.append("template_desc", templateDesc);
    addData.append("files", banner);
    console.log("template pdfs", templatePdfs);

    templatePdfs.forEach((pdf, index) => {
      addData.append("files", pdf);
      addData.append(
        "pdf_title",
        document.getElementById(`pdf-title-${index}`).value
      );
      addData.append(
        "watermark",
        document.getElementById(`flexSwitch-pdf-wm-${index}`).value == "off"
          ? false
          : true
      );
      addData.append(
        "top_left_logo",
        document.getElementById(`flexSwitch-pdf-lb-${index}`).value == "off"
          ? false
          : true
      );
      addData.append(
        "bottom_right_page_no",
        document.getElementById(`flexSwitch-pdf-pn-${index}`).value == "off"
          ? false
          : true
      );
      addData.append(
        "pdf_downloadable",
        document.getElementById(`flexSwitch-pdf-do-${index}`).value == "off"
          ? false
          : true
      );
    });

    templateZips.forEach((zip, index) => {
      addData.append("files", zip);
      addData.append(
        "zip_title",
        document.getElementById(`zip-title-${index}`).value
      );
      addData.append(
        "zip_downloadable",
        document.getElementById(`flexSwitch-zip-do-${index}`).value == "off"
          ? false
          : true
      );
    });

    links.forEach((data, ind) => {
      addData.append(
        "link_preview_name",
        document.getElementById(`link-name-${ind}`).value
      );
      addData.append(
        "link_url",
        document.getElementById(`link-url-${ind}`).value
      );
    });

    let createdData = await createTemplates(addData);

    // let tempCreatedData = [];
    // tempCreatedData.push(createdData);
    // setTemplates([...templates, ...tempCreatedData]);
    // if (createdData) {
      // handleClose();
      // window.location.reload()
    // }

    if (
      createdData?.success == "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success == "no") {
      alert("system error try again leter");
    } else if (createdData?.success == "yes") {
      alert("file template created successfully")
      window.location.reload();
    }
  };

  const handleUpdate = async () => {
    let tempdbPdfs = dbPdfs;
    let tempDbZips = dbZips;
    let tempDbLinks = dbLinks;

    let updateData = new FormData();

    updateData.append("templateId", templateId);
    updateData.append("template_name", templateName);
    updateData.append("template_desc", templateDesc);


    tempdbPdfs.length > 0 &&
      tempdbPdfs.forEach((temp, tInd) => {
        updateData.append("db_pdf_id", temp?._id);
        updateData.append("db_pdf_url", temp?.url);
        updateData.append("db_pdf_file_name", temp?.file_name);
        updateData.append(
          "db_pdf_watermark",
          document.getElementById(`flexSwitch-db-pdf-wm-${tInd}`).value == "off"
            ? false
            : true
        );
        updateData.append(
          "db_pdf_top_left_logo",
          document.getElementById(`flexSwitch-db-pdf-lb-${tInd}`).value == "off"
            ? false
            : true
        );
        updateData.append(
          "db_pdf_bottom_right_page_no",
          document.getElementById(`flexSwitch-db-pdf-pn-${tInd}`).value == "off"
            ? false
            : true
        );
        updateData.append(
          "db_pdf_pdf_downloadable",
          document.getElementById(`flexSwitch-db-pdf-do-${tInd}`).value == "off"
            ? false
            : true
        );
      });

    tempDbZips.length > 0 &&
      tempDbZips.forEach((temp, tInd) => {
        updateData.append("db_zip_id", temp?._id);
        updateData.append("db_zip_url", temp?.url);
        updateData.append("db_zip_file_name", temp?.file_name);
        updateData.append(
          "db_zip_zip_downloadable",
          document.getElementById(`flexSwitch-db-zip-do-${tInd}`).value == "off"
            ? false
            : true
        );
      });

    tempDbLinks.length > 0 &&
      tempDbLinks.forEach((temp, tInd) => {
        updateData.append("db_link_id", temp?._id);
        updateData.append(
          "db_link_preview_name",
          document.getElementById(`db-link-name-${tInd}`).value
        );
        updateData.append(
          "db_link_url",
          document.getElementById(`db-link-url-${tInd}`).value
        );
      });

    // updateData.append("files", templateImage);

    templatePdfs.forEach((pdf, index) => {
      updateData.append("files", pdf);
      updateData.append(
        "pdf_title",
        document.getElementById(`pdf-title-${index}`).value
      );
      updateData.append(
        "watermark",
        document.getElementById(`flexSwitch-pdf-wm-${index}`).value == "off"
          ? false
          : true
      );
      updateData.append(
        "top_left_logo",
        document.getElementById(`flexSwitch-pdf-lb-${index}`).value == "off"
          ? false
          : true
      );
      updateData.append(
        "bottom_right_page_no",
        document.getElementById(`flexSwitch-pdf-pn-${index}`).value == "off"
          ? false
          : true
      );
      updateData.append(
        "pdf_downloadable",
        document.getElementById(`flexSwitch-pdf-do-${index}`).value == "off"
          ? false
          : true
      );
    });

    templateZips.forEach((zip, index) => {
      updateData.append("files", zip);
      updateData.append(
        "zip_title",
        document.getElementById(`zip-title-${index}`).value
      );
      updateData.append(
        "zip_downloadable",
        document.getElementById(`flexSwitch-zip-do-${index}`).value == "off"
          ? false
          : true
      );
    });

    links.forEach((data, ind) => {
      updateData.append(
        "link_preview_name",
        document.getElementById(`link-name-${ind}`).value
      );
      updateData.append(
        "link_url",
        document.getElementById(`link-url-${ind}`).value
      );
    });

    let updatedData = await updateTemplates(updateData);

    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      alert("file template updated successfully")
      window.location.reload();
    }
  };

  const handleDelete = async (id) => {
    const deleteData = { templateId: id }
    const deletedData = await deleteTemplates(deleteData)
    if (
      deletedData?.success == "no" &&
      deletedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (deletedData?.success == "no") {
      alert("system error try again leter");
    } else if (deletedData?.success == "yes") {
      // let tempTemplates = templates
      // tempTemplates.forEach((temp, ind) => {
      //   if (temp?._id == id) {
      //     tempTemplates.splice(ind, 1)
      //   }
      // })
      // setTemplates([...tempTemplates])

      alert("faq deleted successfully")
      window.location.reload();
    }

    
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

      const fetcher = async () => {
        let templatesData = await fetchTemplates();
        if (templatesData?.message === "jwt expired") {
          return navigate("/");
        } else {
      setTemplates([...templatesData]);}
      };

      fetcher();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    if (templatePdfs.length !== 0) {
      const index = templatePdfs.length - 1;

      document.getElementById(`flexSwitch-pdf-wm-${index}`).value = "off";
      document.getElementById(`flexSwitch-pdf-lb-${index}`).value = "off";
      document.getElementById(`flexSwitch-pdf-pn-${index}`).value = "off";
      document.getElementById(`flexSwitch-pdf-do-${index}`).value = "off";
    }
  }, [templatePdfs]);

  useEffect(() => {
    if (templateZips.length !== 0) {
      const index = templateZips.length - 1;
      document.getElementById(`flexSwitch-zip-do-${index}`).value = "off";
    }
  }, [templateZips]);

  useEffect(() => {
    if (dbPdfs.length !== 0) {
      dbPdfs.forEach((dp, index) => {
        dp?.watermark == false
          ? (document.getElementById(`flexSwitch-db-pdf-wm-${index}`).value =
            "off")
          : (document.getElementById(`flexSwitch-db-pdf-wm-${index}`).value =
            "on");

        dp?.watermark == false
          ? (document.getElementById(
            `flexSwitch-db-pdf-wm-${index}`
          ).checked = false)
          : (document.getElementById(
            `flexSwitch-db-pdf-wm-${index}`
          ).checked = true);

        dp?.top_left_logo == false
          ? (document.getElementById(`flexSwitch-db-pdf-lb-${index}`).value =
            "off")
          : (document.getElementById(`flexSwitch-db-pdf-lb-${index}`).value =
            "on");

        dp?.top_left_logo == false
          ? (document.getElementById(
            `flexSwitch-db-pdf-lb-${index}`
          ).checked = false)
          : (document.getElementById(
            `flexSwitch-db-pdf-lb-${index}`
          ).checked = true);

        dp?.bottom_right_page_no == false
          ? (document.getElementById(`flexSwitch-db-pdf-pn-${index}`).value =
            "off")
          : (document.getElementById(`flexSwitch-db-pdf-pn-${index}`).value =
            "on");

        dp?.bottom_right_page_no == false
          ? (document.getElementById(
            `flexSwitch-db-pdf-pn-${index}`
          ).checked = false)
          : (document.getElementById(
            `flexSwitch-db-pdf-pn-${index}`
          ).checked = true);

        dp?.pdf_downloadable == false
          ? (document.getElementById(`flexSwitch-db-pdf-do-${index}`).value =
            "off")
          : (document.getElementById(`flexSwitch-db-pdf-do-${index}`).value =
            "on");

        dp?.pdf_downloadable == false
          ? (document.getElementById(
            `flexSwitch-db-pdf-do-${index}`
          ).checked = false)
          : (document.getElementById(
            `flexSwitch-db-pdf-do-${index}`
          ).checked = true);
      });
    }
  }, [dbPdfs]);

  useEffect(() => {
    if (dbZips.length !== 0) {
      dbZips.forEach((dz, index) => {
        console.log("dzz", dbZips);

        dz?.zip_downloadable == false
          ? (document.getElementById(`flexSwitch-db-zip-do-${index}`).value =
            "off")
          : (document.getElementById(`flexSwitch-db-zip-do-${index}`).value =
            "on");

        dz?.zip_downloadable == false
          ? (document.getElementById(
            `flexSwitch-db-zip-do-${index}`
          ).checked = false)
          : (document.getElementById(
            `flexSwitch-db-zip-do-${index}`
          ).checked = true);
      });
    }
  }, [dbZips]);

  useEffect(() => {
    if (dbLinks.length !== 0) {
      dbLinks.forEach((dl, ind) => {
        document.getElementById(`db-link-name-${ind}`).value =
          dl?.link_preview_name;
        document.getElementById(`db-link-url-${ind}`).value = dl?.link_url;
      });
    }
  }, [dbLinks]);

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />

      <div className="row">
        {windowWidth > 768 && (
          <Sidebar activeOption="file-upload-temp-editor" />
        )}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-end mb-5">
            <button
              className="btn "
              style={{
                width: "fit-content",
                background: "#90EE90",
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                setUpdate(false);
                setDbImage("")
                setDbLinks([]);
                setDbPdfs([]);
                setDbZips([]);
                setShowModal(true);
              }}
            >
              <AddIcon />
              <span className="ms-2">Create</span>
            </button>
          </div>
          <div className="d-flex row">
            <div className="col fw-bold">
              {`Templates(${templates?.length || 0})`}
            </div>
            <div className="col d-flex">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <button
                  className="btn btn-outline-primary"
                  type="search"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <table className="table mt-1 p-4 w-70 text-center">
            <thead>
              <tr className="table-primary table-striped">
                <th scope="col">SN.</th>
                <th scope="col">Template Name</th>
                <th scope="col">View</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {templates && templates?.length !== 0 ? (
              templates.map((temp, index) => (
                <tbody>
                  <tr>
                    <th scope="col">{index + 1}.</th>
                    <th scope="col"> {temp?.template_name}</th>
                    <th scope="col">
                      <Link to="/view-file-template" state={{ templateData: temp }}>
                        view
                      </Link>
                    </th>
                    <th scope="col ">
                      <CreateIcon
                        className="text-primary border border-primary rounded me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUpdate(true);
                          setTemplateName(temp?.template_name);
                          setTemplateDesc(temp?.template_desc);
                          setDbPdfs(temp?.template_pdfs);
                          setDbZips(temp?.template_zips);
                          setTemplateId(temp?._id);
                          setDbImage(temp?.template_image)
                          setDbLinks(temp?.template_links);
                          setShowModal(true);
                        }}
                      />
                      <DeleteIcon
                        className="text-danger border border-danger cursor-pointer rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => { handleDelete(temp?._id) }}
                      />
                    </th>
                  </tr>
                </tbody>
              ))
            ) : (
              <>
                <p>no data found</p>
              </>
            )}
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Templates" : "Add Templates"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">
            <div className="mb-2">
              <label className="pb-1">Template Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Template Name"
                value={templateName}
                onChange={(e) => {

                 for(let temp of templates){
                  if(e.target.value===temp?.template_name){
                    alert("template name already taken")
                    return;
                  }
                 }
                  setTemplateName(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Template Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Template Description"
                value={templateDesc}
                onChange={(e) => {
                  setTemplateDesc(e.target.value);
                }}
              />
            </div>

            {/* {dbImage && <div className="mb-2">
              <label className="pb-1">Attached Template Image</label>
              <img
                src={dbImage}
                alt="db template image"
                className="form-control"
              />
            </div>} */}

            {/* <div className="mb-2">
              <label className="pb-1">Template Image</label>
              <input
                type="file"
                id="add-image"
                className="form-control"
                placeholder="Template Image"
                // onChange={imageFileHandler}
              />
            </div> */}

            {dbPdfs.length !== 0 &&

              <div className="mb-2">
                <label className="pb-1">Already Attached Pdfs</label>
                {dbPdfs.map((dp, ind) => (
                  <div className="d-flex">
                    {dp?.file_name}
                    <div class="form-check form-switch ms-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitch-db-pdf-wm-${ind}`}
                        onChange={() => {
                          handleSubBtns(`flexSwitch-db-pdf-wm-${ind}`);
                        }}
                      />
                      <label
                        class="form-check-label"
                        for={`flexSwitch-db-pdf-wm-${ind}`}
                      >
                        Watermark
                      </label>
                    </div>
                    <div class="form-check form-switch ms-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitch-db-pdf-lb-${ind}`}
                        onChange={() => {
                          handleSubBtns(`flexSwitch-db-pdf-lb-${ind}`);
                        }}
                      />
                      <label
                        class="form-check-label"
                        for={`flexSwitch-db-pdf-lb-${ind}`}
                      >
                        Top Left Logo
                      </label>
                    </div>
                    <div class="form-check form-switch  ms-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitch-db-pdf-pn-${ind}`}
                        onChange={() => {
                          handleSubBtns(`flexSwitch-db-pdf-pn-${ind}`);
                        }}
                      />
                      <label
                        class="form-check-label"
                        for={`flexSwitch-db-pdf-pn-${ind}`}
                      >
                        Bottom Right Page No
                      </label>
                    </div>
                    <div class="form-check form-switch ms-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitch-db-pdf-do-${ind}`}
                        onChange={() => {
                          handleSubBtns(`flexSwitch-db-pdf-do-${ind}`);
                        }}
                      />
                      <label
                        class="form-check-label"
                        for={`flexSwitch-db-pdf-do-${ind}`}
                      >
                        Download Option
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            }

            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <label className="pb-1">Template Pdfs</label>
                <button
                  className="btn"
                  style={{
                    width: "fit-content",
                    background: "#cfb0cc",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handlePdfsInputCnt();
                  }}
                >
                  add pdfs <AddIcon />
                </button>
              </div>

              {pdfsCnt.length !== 0 &&
                pdfsCnt.map((data, ind) => (
                  <>
                    <div className="d-flex mt-2">
                      <input
                        type="text"
                        id={`pdf-title-${ind}`}
                        className="form-control"
                        placeholder="Pdf Title"
                      />
                      <input
                        type="file"
                        id={`add-pdfs-${ind}`}
                        className="form-control ms-2"
                        placeholder="Template Pdfs"
                        onChange={(e) => {
                          pdfFilesHandler(e, ind);
                        }}
                      />
                    </div>

                    {templatePdfs[ind] && (
                      <div className="d-flex">
                        {templatePdfs[ind]?.name}
                        <div class="form-check form-switch ms-2">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-pdf-wm-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-pdf-wm-${ind}`);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for={`flexSwitch-pdf-wm-${ind}`}
                          >
                            Watermark
                          </label>
                        </div>
                        <div class="form-check form-switch ms-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-pdf-lb-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-pdf-lb-${ind}`);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for={`flexSwitch-pdf-lb-${ind}`}
                          >
                            Top Left Logo
                          </label>
                        </div>
                        <div class="form-check form-switch  ms-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-pdf-pn-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-pdf-pn-${ind}`);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for={`flexSwitch-pdf-pn-${ind}`}
                          >
                            Bottom Right Page No
                          </label>
                        </div>
                        <div class="form-check form-switch ms-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-pdf-do-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-pdf-do-${ind}`);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for={`flexSwitch-pdf-do-${ind}`}
                          >
                            Download Option
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>

            {dbZips.length !== 0 &&
              <div className="mb-2">
                <label className="pb-1">Already Attached Zips</label>
                {
                  dbZips.map((dz, ind) => (

                    <div className="d-flex">
                      {dz?.file_name}

                      <div class="form-check form-switch ms-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitch-db-zip-do-${ind}`}
                          onChange={() => {
                            handleSubBtns(`flexSwitch-db-zip-do-${ind}`);
                          }}
                        />
                        <label
                          class="form-check-label"
                          for={`flexSwitch-db-zip-do-${ind}`}
                        >
                          Download Option
                        </label>
                      </div>
                    </div>))}
              </div>
            }

            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <label className="pb-1">Template Zips</label>
                <button
                  className="btn"
                  style={{
                    width: "fit-content",
                    background: "#cfb0cc",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handleZipsInputCnt();
                  }}
                >
                  add zips <AddIcon />
                </button>
              </div>

              {zipsCnt.length !== 0 &&
                zipsCnt.map((data, ind) => (
                  <>
                    <div className="d-flex mt-2">
                      <input
                        type="text"
                        id={`zip-title-${ind}`}
                        className="form-control"
                        placeholder="Zip Title"
                      />
                      <input
                        type="file"
                        id={`add-zips-${ind}`}
                        className="form-control ms-2"
                        placeholder="Template Zips"
                        onChange={(e) => {
                          zipFilesHandler(e, ind);
                        }}
                      />
                    </div>

                    {templateZips[ind] && (
                      <div className="d-flex">
                        {templateZips[ind]?.name}

                        <div class="form-check form-switch ms-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-zip-do-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-zip-do-${ind}`);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for={`flexSwitch-zip-do-${ind}`}
                          >
                            Download Option
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>

            {dbLinks.length !== 0 &&
              <div className="mb-2">
                <label className="pb-1">Already Attached Links</label>
                {dbLinks.map((dl, ind) => (

                  <div className="d-flex">
                    <input
                      placeholder="db link preview name"
                      id={`db-link-name-${ind}`}
                    />

                    <input
                      placeholder="db link url"
                      id={`db-link-url-${ind}`}
                    />
                  </div>))}
              </div>
            }

            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <label className="pb-1">Template Links</label>
                <button
                  className="btn"
                  style={{
                    width: "fit-content",
                    background: "#cfb0cc",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handleLinks();
                  }}
                >
                  add links <AddIcon />
                </button>
              </div>

              {links.length !== 0 &&
                links.map((data, ind) => (
                  <div className="d-flex mt-2">
                    <input
                      type="text"
                      id={`link-name-${ind}`}
                      className="form-control"
                      placeholder="Template Links Name"
                    />
                    <input
                      type="text"
                      id={`link-url-${ind}`}
                      className="form-control ms-2"
                      placeholder="Template Links Url"
                    />
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              update ? handleUpdate() : handleCreate();
            }}
          >
            {update ? "update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FileUploadTempEditor;
