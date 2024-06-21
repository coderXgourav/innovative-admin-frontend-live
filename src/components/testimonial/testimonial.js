
import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchTestimonials, createTestimonials, updateTestimonials, deleteTestimonials } from "../../api-calls/apicalls";
import testi1 from "../../assets/testi1.png";
import testi2 from "../../assets/testi2.png";
import testi3 from "../../assets/testi3.png";
import { useNavigate } from "react-router-dom";

function TestimonialManagement() {
    const [windowWidth, setWindowWidth] = useState();
    const [name, setName] = useState("");
    const [userNames, setUserNames] = useState([]);
    const [images, setImages] = useState([testi1, testi2, testi3]);
    // const [image, setImage] = useState("");
    const [descriptions, setDescriptions] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [update, setUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false);
    const [testimonialId, setTestimonialId] = useState("")
    const [testimonials, setTestimonials] = useState([])

    const navigate = useNavigate();

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleClose = () => {
        setShowCreate(false);

    };

    const handleCreate = async () => {

        let addData = []

        if (userNames.length == descriptions.length && descriptions.length == professions.length) {
            userNames.forEach((_, index) => {
                addData.push({
                    user_name: userNames[index],
                    description: descriptions[index],
                    profession: professions[index]

                })
            })
        }
        // console.log("rrr",addData)
        const createdData = await createTestimonials({ name: name, user_details: JSON.stringify(addData) })
        if (
            createdData?.success === "no" &&
            createdData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (createdData?.success === "no") {
            alert("system error try again leter");
        } else if (createdData?.success === "yes") {
            alert("testimonial created successfully")
            handleClose()
            window.location.reload();
        }
    }

    const handleUpdate = async () => {

        let updateData = []

        if (userNames.length == descriptions.length && descriptions.length == professions.length) {
            userNames.forEach((_, index) => {
                updateData.push({
                    user_name: userNames[index],
                    description: descriptions[index],
                    profession: professions[index]

                })
            })
        }

        const updatedData = await updateTestimonials({ testimonial_id: testimonialId, name: name, user_details: JSON.stringify(updateData) })
        if (
            updatedData?.success === "no" &&
            updatedData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (updatedData?.success === "no") {
            alert("system error try again leter");
        } else if (updatedData?.success === "yes") {
            alert("testimonial updated successfully")
            handleClose()
            window.location.reload();
        }
    }

    const handleDelete = async (id) => {
        const deleteData = { testimonial_id: id }
        const deletedData = await deleteTestimonials(deleteData)
        if (deletedData.success === "yes") {

            alert("testimonial deleted successfully")
            window.location.reload()
        }
    }

    useEffect(() => {

        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        const fetcher = async () => {

            let testimonials = await fetchTestimonials();
            if (testimonials?.message === "jwt expired") {
                return navigate("/");
            } else {
                setTestimonials([...testimonials]);
            }

        };

        fetcher();


        return () => {
            window.removeEventListener("resize", updateWindowWidth);

        };
    }, []);



    return (
        <div>
            <Nav />
            <hr style={{ color: "black", margin: "0" }} />

            <div className="row">
                {windowWidth > 768 && <Sidebar activeOption="testimonial-management" />}
                <div className="col-md-10 p-4" style={{ height:'90vh',overflowY:'auto' }}>
                    {/* <div className="d-flex justify-content-end mb-5">
                        <button
                            className="btn "
                            style={{
                                width: "fit-content",
                                background: "#90EE90",
                                whiteSpace: "nowrap",
                            }}
                            onClick={() => {
                                setUpdate(false)
                                setShowCreate(true)
                            }}
                        >
                            <AddIcon />
                            <span className="ms-2">create testimonial</span>
                        </button>
                    </div> */}


                    <table className="table mt-1 p-4 w-70 text-center">
                        <thead>
                            <tr className="table-primary table-striped">
                                <th scope="col">SN.</th>
                                <th scope="col"> Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {(testimonials && testimonials?.length !== 0) ? (
                            testimonials.map((tm, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="col">{index + 1}.</th>
                                        <th scope="col"> {tm?.name}</th>

                                        <th scope="col ">
                                            <CreateIcon
                                                className="text-primary border border-primary rounded me-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setUpdate(true);
                                                    setTestimonialId(tm?._id)
                                                    setName(tm?.name)

                                                    let tempUserNames = []
                                                    let tempDescriptions = []
                                                    let tempProfessions = []

                                                    tm?.user_details?.forEach((ud) => {
                                                        tempUserNames.push(ud?.user_name)
                                                        tempDescriptions.push(ud?.description)
                                                        tempProfessions.push(ud?.profession)
                                                    })

                                                    setUserNames([...tempUserNames])
                                                    setDescriptions([...tempDescriptions])
                                                    setProfessions([...tempProfessions])

                                                    setShowCreate(true);
                                                }}
                                            />
                                            {/* <DeleteIcon
                                                className="text-danger border border-danger cursor-pointer rounded"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    handleDelete(tm?._id)
                                                }}
                                            /> */}
                                        </th>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <>
                                <p>loading...</p>
                            </>
                        )}
                    </table>


                </div>
            </div>


            <Modal show={showCreate} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {update ? "Update Testimonial" : "Add Testimonial"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name "
                                value={name}
                                className="form-control"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />

                        </div>



                        <div className="form-group mt-4">
                            {
                                images.map((image, index) => (
                                    <>
                                        <div className="d-flex justify-content-center">
                                            <p className="fw-bold">{`Change user number ${index + 1} information`}</p>
                                        </div>
                                        <div className="form-group mt-4">
                                            <label
                                                class="form-label"
                                                for="user-name"
                                            >
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                id="user-name "
                                                value={userNames[index]}
                                                className="form-control"
                                                onChange={(e) => {
                                                    let tempUserNames = userNames
                                                    tempUserNames[index] = e.target.value
                                                    setUserNames([...tempUserNames])
                                                }}
                                            />

                                        </div>

                                        <div className="form-group mt-4">
                                            <label
                                                class="form-label"
                                                for="db-testimonial-image"
                                            >
                                                Attached Testimonial Images <span className="fw-bold">(you can't change this image from here)</span>
                                            </label>
                                            <img
                                                alt="attached-testimonial-image"
                                                className="form-control w-25"
                                                src={image}
                                                style={{
                                                    height: index !== 2 ? "25%" : "20%"
                                                }}
                                            />
                                        </div>

                                        <div className="form-group mt-4">
                                            <label
                                                class="form-label"
                                                for="description"
                                            >
                                                description
                                            </label>
                                            <textarea
                                                type="text"
                                                id="description"
                                                value={descriptions[index]}
                                                className="form-control"
                                                onChange={(e) => {
                                                    let tempDescriptions = descriptions
                                                    tempDescriptions[index] = e.target.value
                                                    setDescriptions([...tempDescriptions])
                                                }}
                                            />
                                        </div>

                                        <div className="form-group mt-4">
                                            <label
                                                class="form-label"
                                                for="discounted_price"
                                            >
                                                Profession
                                            </label>
                                            <input
                                                type="text"
                                                id="profession"
                                                value={professions[index]}
                                                className="form-control"
                                                onChange={(e) => {
                                                    let tempProfessions = professions
                                                    tempProfessions[index] = e.target.value
                                                    setProfessions([...tempProfessions])
                                                }}
                                            />
                                        </div>

                                        <hr className="mt-4 mb-2" />
                                    </>
                                ))
                            }
                        </div>

                        {/* <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="image"
                            >
                                {update ? "Change  Image" : " Image"}
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}
                            />

                        </div> */}


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
                            {
                                update ? handleUpdate() :
                                    handleCreate()
                            }
                        }}
                    >
                        {update ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TestimonialManagement