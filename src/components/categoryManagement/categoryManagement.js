
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
import CloseIcon from '@mui/icons-material/Close';
import { createCategories, fetchMcqTemplates, fetchQuizTemplates, fetchTemplates, fetchCategories, updateCategories, deleteCategories } from "../../api-calls/apicalls";
import { useNavigate } from "react-router-dom";

function CategoryManagement() {
    const [windowWidth, setWindowWidth] = useState();
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [categoryDbImage, setCategoryDbImage] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [categories, setCategories] = useState([]);

    // const [quizTemplates, setQuizTemplates] = useState([]);
    // const [selectedQuizTemplates, setSelectedQuizTemplates] = useState([]);


    // const [mcqTemplates, setMcqTemplates] = useState([]);
    // const [selectedMcqTemplates, setSelectedMcqTemplates] = useState([]);

    // const [fileTemplates, setFileTemplates] = useState([]);
    // const [selectedFileTemplates, setSelectedFileTemplates] = useState([]);

    const [update, setUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false);

    const navigate = useNavigate();

    // const [showFileTempDropdown, setShowFileTempDropdown] = useState(false);
    // const [showQuizTempDropdown, setShowQuizTempDropdown] = useState(false);
    // const [showMcqTempDropdown, setShowMcqTempDropdown] = useState(false);


    // const fileTempInputRef = useRef(null);
    // const quizTempInputRef = useRef(null);
    // const mcqTempInputRef = useRef(null);


    // const handleFileTempInputClick = () => {
    //     setShowFileTempDropdown(!showFileTempDropdown);
    // };

    // const handleQuizTempInputClick = () => {
    //     setShowQuizTempDropdown(!showQuizTempDropdown);
    // };

    // const handleMcqTempInputClick = () => {
    //     setShowMcqTempDropdown(!showMcqTempDropdown);
    // };

    // const handleOutsideClick = (e) => {
    //     if (fileTempInputRef.current && !fileTempInputRef.current.contains(e.target)) {
    //         setShowFileTempDropdown(false);
    //     }

    //     if (quizTempInputRef.current && !quizTempInputRef.current.contains(e.target)) {
    //         setShowQuizTempDropdown(false)
    //     }

    //     if (mcqTempInputRef.current && !mcqTempInputRef.current.contains(e.target)) {
    //         setShowMcqTempDropdown(false)
    //     }
    // };

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleClose = () => {
        setShowCreate(false);

    };

    const handleCreate = async () => {
        // let fileTemplatesIds = []
        // let mcqTemplatesIds = []
        // let quizTemplatesIds = []

        // selectedFileTemplates.forEach((file) => {
        //     fileTemplatesIds.push(file?._id)
        // })

        // selectedMcqTemplates.forEach((mcq) => {
        //     mcqTemplatesIds.push(mcq?._id)
        // })

        // selectedQuizTemplates.forEach((quiz) => {
        //     quizTemplatesIds.push(quiz?._id)
        // })


        // const addData = {
        //     name: categoryName,
        //     image:categoryImage
        //     // file_templates: fileTemplatesIds,
        //     // mcq_templates: mcqTemplatesIds,
        //     // quiz_templates: quizTemplatesIds
        // }

        let addData = new FormData()
        addData.append("name", categoryName)
        addData.append("category", categoryImage)

        const createdData = await createCategories(addData)

        if (
            createdData?.success == "no" &&
            createdData?.message === "jwt expired"
          ) {
            return navigate("/");
          } else if (createdData?.success == "no") {
            alert("system error try again leter");
          } else if (createdData?.success == "yes") {
            alert("category created successfully")
            window.location.reload();
          }

    }

    const handleUpdate = async () => {
        // let fileTemplatesIds = []
        // let mcqTemplatesIds = []
        // let quizTemplatesIds = []

        // selectedFileTemplates.forEach((file) => {
        //     fileTemplatesIds.push(file?._id)
        // })

        // selectedMcqTemplates.forEach((mcq) => {
        //     mcqTemplatesIds.push(mcq?._id)
        // })

        // selectedQuizTemplates.forEach((quiz) => {
        //     quizTemplatesIds.push(quiz?._id)
        // })


        // const updateData = {
        //     name: categoryName,
        //     category_id:categoryId,
        //     image:image
        // file_templates: fileTemplatesIds,
        // mcq_templates: mcqTemplatesIds,
        // quiz_templates: quizTemplatesIds
        // }

        let updateData = new FormData()
        updateData.append("name", categoryName)
        updateData.append("category_id", categoryId)
        updateData.append("category", categoryImage)

        const updatedData = await updateCategories(updateData)

        if (
            updatedData?.success == "no" &&
            updatedData?.message === "jwt expired"
          ) {
            return navigate("/");
          } else if (updatedData?.success == "no") {
            alert("system error try again leter");
          } else if (updatedData?.success == "yes") {
            alert("category updated successfully")
            window.location.reload();
          }
    }

    const handleDelete = async (id) => {
        const deleteData = { cat_id: id }
        const deletedData = await deleteCategories(deleteData)
        if (
            deletedData?.success == "no" &&
            deletedData?.message === "jwt expired"
          ) {
            return navigate("/");
          } else if (deletedData?.success == "no") {
            alert("system error try again leter");
          } else if (deletedData?.success == "yes") {
            alert("category deleted successfully")
            window.location.reload();
          }
    }

    useEffect(() => {

        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        const fetcher = async () => {
            // let templatesData = await fetchTemplates();
            // setFileTemplates([...templatesData]);

            // let quizzesData = await fetchQuizTemplates();
            // setQuizTemplates([...quizzesData]);

            // let mcqsData = await fetchMcqTemplates();
            // setMcqTemplates([...mcqsData]);

            let categories = await fetchCategories();
            if (categories?.message === "jwt expired") {
                return navigate("/");
              } else {
               setCategories([...categories]);
              }

        };

        fetcher();
        // document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            window.removeEventListener("resize", updateWindowWidth);
            // document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            <Nav />
            <hr style={{ color: "black", margin: "0" }} />
            <div className="row">
                {windowWidth > 768 && <Sidebar activeOption="category-management" />}
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
                                setUpdate(false)
                                setShowCreate(true)


                            }}
                        >
                            <AddIcon />
                            <span className="ms-2">create category</span>
                        </button>
                    </div>


                    <table className="table mt-1 p-4 w-70 text-center">
                        <thead>
                            <tr className="table-primary table-striped">
                                <th scope="col">SN.</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        {categories && categories?.length !== 0 ? (
                            categories.map((cat, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="col">{index + 1}.</th>
                                        <th scope="col"> {cat?.name}</th>

                                        <th scope="col ">
                                            <CreateIcon
                                                className="text-primary border border-primary rounded me-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setUpdate(true);
                                                    setCategoryName(cat?.name)
                                                    setCategoryId(cat?._id)
                                                    setCategoryDbImage(cat?.image)
                                                    // setSelectedFileTemplates(cat?.file_templates)
                                                    // setSelectedMcqTemplates(cat?.mcq_templates)
                                                    // setSelectedQuizTemplates(cat?.quiz_templates)
                                                    setShowCreate(true);


                                                }}
                                            />
                                            <DeleteIcon
                                                className="text-danger border border-danger cursor-pointer rounded"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    handleDelete(cat?._id)
                                                }}
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
            <Modal show={showCreate} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {update ? "Update Category" : "Add Category"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="category-name"
                            >
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="category-name "
                                value={categoryName}
                                className="form-control"
                                onChange={(e) => {
                                    setCategoryName(e.target.value)
                                }}
                            />

                        </div>

                        {
                            categoryDbImage && (
                                <div className="form-group mt-4">
                                    <label
                                        class="form-label"
                                        for="category-db-image"
                                    >
                                        Attached Category Image
                                    </label>
                                    <img
                                        id="category-db-image"
                                        alt="category-db-image "

                                        className="form-control"
                                        src={categoryDbImage}
                                    />

                                </div>
                            )
                        }

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="category-image"
                            >
                                {update ? "Change Category Image" : "Category Image"}
                            </label>
                            <input
                                type="file"
                                id="category-image "

                                className="form-control"
                                onChange={(e) => {
                                    setCategoryImage(e.target.files[0])
                                }}
                            />

                        </div>

                        {/* <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="file-templates"
                            >
                                select file templates
                            </label>
                            <div className="dropdown" ref={fileTempInputRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Select File Templates"
                                    onClick={handleFileTempInputClick}
                                    readOnly
                                />
                                {showFileTempDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {fileTemplates && fileTemplates.map((file, _) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e) => {

                                                let tempSelectedFileTemp = selectedFileTemplates
                                                for (let temp of tempSelectedFileTemp) {
                                                    if (temp?.template_name == file?.template_name) {
                                                        alert("already selected")
                                                        setShowFileTempDropdown(false)
                                                        return;
                                                    }
                                                }
                                                tempSelectedFileTemp.push(file)
                                                setSelectedFileTemplates([...tempSelectedFileTemp])
                                                setShowFileTempDropdown(false)
                                            }}>{file?.template_name}</a></li>
                                        ))

                                        }

                                    </ul>
                                )}

                            </div>
                        </div>

                        <div className="d-flex mt-3">
                            {selectedFileTemplates && selectedFileTemplates.map((file, ind) => (
                                <div className="border border-secondary rounded  ms-3" style={{ width: "15%" }}>
                                    <div className="d-flex justify-content-end"><CloseIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                        let tempSelectedFileTemp = selectedFileTemplates
                                        tempSelectedFileTemp.splice(ind, 1)
                                        setSelectedFileTemplates([...tempSelectedFileTemp])
                                    }} /></div>
                                    <div className="d-flex justify-content-center">
                                        {file?.template_name}
                                    </div>

                                </div>
                            ))}

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="quiz-templates"
                            >
                                select quiz templates
                            </label>
                            <div className="dropdown" ref={quizTempInputRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Select Quiz Templates"
                                    onClick={handleQuizTempInputClick}
                                    readOnly
                                />
                                {showQuizTempDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {quizTemplates && quizTemplates.map((quiz, _) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e) => {

                                                let tempSelectedQuizTemp = selectedQuizTemplates


                                                for (let temp of tempSelectedQuizTemp) {
                                                    if (temp?.paper_name == quiz?.paper_name) {

                                                        alert("already selected")
                                                        setShowQuizTempDropdown(false)
                                                        return;
                                                    }
                                                }

                                                tempSelectedQuizTemp.push(quiz)
                                                setSelectedQuizTemplates([...tempSelectedQuizTemp])
                                                setShowQuizTempDropdown(false)
                                            }}>{quiz?.paper_name}</a></li>
                                        ))

                                        }

                                    </ul>
                                )}

                            </div>
                        </div>

                        <div className="d-flex mt-3">
                            {selectedQuizTemplates && selectedQuizTemplates.map((quiz, ind) => (
                                <div className="border border-secondary rounded  ms-3" style={{ width: "15%" }}>
                                    <div className="d-flex justify-content-end"><CloseIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                        let tempSelectedQuizTemp = selectedQuizTemplates
                                        tempSelectedQuizTemp.splice(ind, 1)
                                        setSelectedQuizTemplates([...tempSelectedQuizTemp])
                                    }} /></div>
                                    <div className="d-flex justify-content-center">
                                        {quiz?.paper_name}
                                    </div>

                                </div>
                            ))}

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="quiz-templates"
                            >
                                select mcq templates
                            </label>
                            <div className="dropdown" ref={mcqTempInputRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Select Mcq Templates"
                                    onClick={handleMcqTempInputClick}
                                    readOnly
                                />
                                {showMcqTempDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {mcqTemplates && mcqTemplates.map((mcq, _) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e) => {

                                                let tempSelectedMcqTemp = selectedMcqTemplates


                                                for (let temp of tempSelectedMcqTemp) {
                                                    if (temp?.paper_name == mcq?.paper_name) {

                                                        alert("already selected")
                                                        setShowMcqTempDropdown(false)
                                                        return;
                                                    }
                                                }

                                                tempSelectedMcqTemp.push(mcq)
                                                setSelectedMcqTemplates([...tempSelectedMcqTemp])
                                                setShowMcqTempDropdown(false)
                                            }}>{mcq?.paper_name}</a></li>
                                        ))

                                        }

                                    </ul>
                                )}

                            </div>
                        </div>

                        <div className="d-flex mt-3">
                            {selectedMcqTemplates && selectedMcqTemplates.map((mcq, ind) => (
                                <div className="border border-secondary rounded  ms-3" style={{ width: "15%" }}>
                                    <div className="d-flex justify-content-end"><CloseIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                        let tempSelectedMcqTemp = selectedMcqTemplates
                                        tempSelectedMcqTemp.splice(ind, 1)
                                        setSelectedMcqTemplates([...tempSelectedMcqTemp])
                                    }} /></div>
                                    <div className="d-flex justify-content-center">
                                        {mcq?.paper_name}
                                    </div>

                                </div>
                            ))}

                        </div> */}


                    </>

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

export default CategoryManagement