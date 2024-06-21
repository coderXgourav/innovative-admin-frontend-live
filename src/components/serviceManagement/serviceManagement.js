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
  createServices,
  fetchServices,
  updateServices,
  deleteServices
} from "../../api-calls/apicalls";
import { useNavigate } from "react-router-dom";


function ServiceManagement() {
  const [windowWidth, setWindowWidth] = useState();
  const [services, setServices] = useState([])
  const [update, setUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [hoverTitle, setHoverTitle] = useState("")
  const [hoverDescription, setHoverDescription] = useState("")
  const [image, setImage] = useState("")
  const [dbImage, setDbImage] = useState("")
  const [serviceId, setServiceId] = useState("")

  const navigate = useNavigate();

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    const addData = new FormData()
    addData.append("name", name)
    addData.append("title", title)
    addData.append("service", image)
    addData.append("description", description)
    addData.append("hover_title", hoverTitle)
    addData.append("hover_description", hoverDescription)
    const createdData = await createServices(addData)
    if (
      createdData?.success === "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success === "no") {
      alert("system error try again leter");
    } else if (createdData?.success === "yes") {
      alert("service created successfully")
      handleClose()
      window.location.reload();
    }
  }

  const handleUpdate = async () => {
    const updateData = new FormData()
    updateData.append("name", name)
    updateData.append("service_id", serviceId)
    updateData.append("title", title)
    updateData.append("service", image)
    updateData.append("description", description)
    updateData.append("hover_title", hoverTitle)
    updateData.append("hover_description", hoverDescription)
    const updatedData = await updateServices(updateData)
    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      alert("service updated successfully")
      window.location.reload();
    }
  }

  const handleDelete = async (id) => {
    const deleteData = { service_id: id }
    const deletedData = await deleteServices(deleteData)

    if (
      deletedData?.success == "no" &&
      deletedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (deletedData?.success == "no") {
      alert("system error try again leter");
    } else if (deletedData?.success == "yes") {
      alert("service deleted successfully")
      window.location.reload();
    }
  }


  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let tempData = await fetchServices();
      if (tempData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setServices([...tempData]);
      }
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
          <Sidebar activeOption="service-management" />
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
              <span className="ms-2">create services</span>
            </button>
          </div>

          <div className="d-flex row">
            <div className="col fw-bold">
              {`Services(${services.length})`}
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
            {services.length !== 0 && services.map((ser, ind) => (
              <tbody>
                <tr >
                  <th scope="col">{ind + 1}</th>
                  <th scope="col"> {ser?.name}</th>

                  <th scope="col ">
                    <CreateIcon
                      className="text-primary border border-primary rounded me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setUpdate(true)
                        setName(ser?.name)
                        setDbImage(ser?.image)
                        setTitle(ser?.title)
                        setDescription(ser?.description)
                        setHoverDescription(ser?.hover_description)
                        setHoverTitle(ser?.hover_title)
                        setShowModal(true)
                        setServiceId(ser?._id)

                      }}
                    />
                    <DeleteIcon
                      className="text-danger border border-danger cursor-pointer rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(ser?._id)
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
            {update ? "Update Services" : "Add Services"}
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
            {dbImage && (
              <div className="mb-2">
                <label className="pb-1">Attached Image</label>
                <img

                  className="form-control"
                  alt="db-mage"

                  src={dbImage}
                />
              </div>
            )}

            <div className="mb-2">
              <label className="pb-1">{update ? "Change Image" : "Image"}</label>
              <input
                type="file"
                className="form-control"
                placeholder="Image"

                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>


            <div className="mb-2">
              <label className="pb-1">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Hover Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="hover-title"
                value={hoverTitle}
                onChange={(e) => {
                  setHoverTitle(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Hover Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="hover-description"
                value={hoverDescription}
                onChange={(e) => {
                  setHoverDescription(e.target.value);
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
              { update ? handleUpdate() : handleCreate() }
            }}
          >
            {update ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>



  )
}

export default ServiceManagement