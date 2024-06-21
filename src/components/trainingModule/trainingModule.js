import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Link, useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import {
 createTrainingModules,
 fetchTrainingModules,
 updateTrainingModules,
 deleteTrainingModules
  
} from "../../api-calls/apicalls";



function TrainingModule() {
  const [windowWidth, setWindowWidth] = useState();
  const [trainingModules,setTrainingModules]=useState([])
  const [update,setUpdate]=useState(false)
  const[showModal,setShowModal]=useState(false)
  const[name,setName]=useState("")
  const[title,setTitle]=useState("")
  const[description,setDescription]=useState("")
  const[hoverTitle,setHoverTitle]=useState("")
  const[hoverDescription,setHoverDescription]=useState("")
  const[image,setImage]=useState("")
  const[dbImage,setDbImage]=useState("")
  const[moduleId,setModuleId]=useState("")

  const navigate = useNavigate();

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    const addData = new FormData()
    addData.append("name",name)
    addData.append("title",title)
    addData.append("trainingModule",image)
    addData.append("description",description)
    addData.append("hover_title",hoverTitle)
    addData.append("hover_description",hoverDescription)
    const createdData = await createTrainingModules(addData)
    if (
      createdData?.success === "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success === "no") {
      alert("system error try again leter");
    } else if (createdData?.success === "yes") {
      alert("training module created successfully")
      handleClose()
      window.location.reload();
    }
  }

  const handleUpdate=async()=>{
    const updateData = new FormData()
    updateData.append("name",name)
    updateData.append("module_id",moduleId)
    updateData.append("title",title)
    updateData.append("trainingModule",image)
    updateData.append("description",description)
    updateData.append("hover_title",hoverTitle)
    updateData.append("hover_description",hoverDescription)
    const updatedData = await updateTrainingModules(updateData)
    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      alert("trainng module updated successfully")
      window.location.reload();
    }
  }

  const handleDelete=async(id)=>{
    const deleteData={module_id:id}
    const deletedData=await deleteTrainingModules(deleteData)

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

      alert("training module deleted successfully")
      window.location.reload();
    }
  }


  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
        let tempData = await fetchTrainingModules();
        setTrainingModules([...tempData]);
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
          <Sidebar activeOption="training-module-management" />
        )}
        <div className="col-md-10 p-4"   style={{ height:'90vh',overflowY:'auto' }}>

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
              {`Training Modules(${trainingModules.length})`}
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
            {trainingModules.length !== 0 && trainingModules.map((tm, ind) => (
              <tbody>
                <tr >
                  <th scope="col">{ind + 1}</th>
                  <th scope="col"> {tm?.name}</th>

                  <th scope="col ">
                    <CreateIcon
                      className="text-primary border border-primary rounded me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                         setUpdate(true)
                         setName(tm?.name)
                         setDbImage(tm?.image)
                         setTitle(tm?.title)
                         setDescription(tm?.description)
                         setHoverDescription(tm?.hover_description)
                         setHoverTitle(tm?.hover_title)
                         setShowModal(true)
                         setModuleId(tm?._id)
                        
                      }}
                    />
                    <DeleteIcon
                      className="text-danger border border-danger cursor-pointer rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                         handleDelete(tm?._id)
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
            {update ? "Update Trining Modules" : "Add Training Modules"}
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
            {dbImage&&(
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

export default TrainingModule