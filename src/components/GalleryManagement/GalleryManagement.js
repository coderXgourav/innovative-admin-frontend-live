import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import {
  createGallery,
  fetchGalleries,
  updateGallery,
  deleteGallery

} from "../../api-calls/apicalls";
import { useNavigate } from "react-router-dom";


function GalleryManagement() {
  const [windowWidth, setWindowWidth] = useState();
  const [galleries, setGalleries] = useState([])
  const [image, setImage] = useState("")
  const [dbImage, setDbImage] = useState("")
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [update, setUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [galleryId,setGalleryId]=useState("")
  const navigate = useNavigate();
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    const galleryData = new FormData()

    galleryData.append("name", name)
    galleryData.append("gallery", image)
    galleryData.append("category", category)

    const createdData = await createGallery(galleryData)
    if (
      createdData?.success == "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success == "no") {
      alert("system error try again leter");
    } else if (createdData?.success == "yes") {
      alert("gallery template created successfully")
      window.location.reload();
    }
  }


  const handleUpdate=async()=>{
    const galleryData = new FormData()

    galleryData.append("name", name)
    galleryData.append("gallery", image)
    galleryData.append("category", category)
    galleryData.append("gallery_id", galleryId)

    const updatedData = await updateGallery(galleryData)

    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      alert("gallery template updated successfully")
      window.location.reload();
    }
  }

  const handleDelete=async(id)=>{
    const deleteData={gallery_id:id}
    const deletedData=await deleteGallery(deleteData)
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

      alert("gallery template deleted successfully")
      window.location.reload();
    }

  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
        let tempGalleriesData = await fetchGalleries();
        if (tempGalleriesData?.message === "jwt expired") {
          return navigate("/");
        } else {
        setGalleries([...tempGalleriesData]);}
    };

    fetcher();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />
      <div className="row">
        {windowWidth > 768 && (
          <Sidebar activeOption="gallery-management" />
        )}
        <div className="col-md-10 p-4" style={{ height:'90vh',overflowY:'auto' }}>

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
                setShowModal(true);
              }}
            >
              <AddIcon />
              <span className="ms-2">create</span>
            </button>
          </div>

          <div className="d-flex row">
            <div className="col fw-bold">
              {`Gallery Files(${galleries.length})`}
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
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {galleries.length !== 0 && galleries.map((gallery, ind) => (
              <tbody>
                <tr >
                  <th scope="col">{ind + 1}</th>
                  <th scope="col"> {gallery?.name}</th>

                  <th scope="col ">
                    <CreateIcon
                      className="text-primary border border-primary rounded me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                         setUpdate(true)
                         setName(gallery?.name)
                         setDbImage(gallery?.image)
                         setCategory(gallery?.category)
                         setGalleryId(gallery?._id)
                         setShowModal(true)
                      }}
                    />
                    <DeleteIcon
                      className="text-danger border border-danger cursor-pointer rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                         handleDelete(gallery?._id)
                      }}
                    />
                  </th>
                </tr>
              </tbody>
            ))}



          </table>
        </div>
      </div>


      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Gallery Files" : "Add Gallery Files"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">
          <div className="mb-2">
              <label className="pb-1">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Attached Image</label>
              <img
                className="form-control"
                alt="attached image"
                src={dbImage}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">{update?"Change Image":"Image"}</label>
              <input
                type="file"
                className="form-control"
                placeholder="Image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
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
               {update?handleUpdate():handleCreate()}
            }}
          >
             {update?"Update":"Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GalleryManagement