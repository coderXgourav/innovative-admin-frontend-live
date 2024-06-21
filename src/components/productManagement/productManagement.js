
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
import { fetchCategories, fetchMcqTemplates, fetchQuizTemplates, fetchTemplates, createProducts, fetchProducts, updateProducts, deleteProducts } from "../../api-calls/apicalls";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";


function ProductManagement() {
    const [windowWidth, setWindowWidth] = useState();
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [dbProductImage, setDbProductImage] = useState("");
    const [realPrice, setRealPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [star, setStar] = useState(0);
    const [update, setUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false);
    const [showProductCatDropdown, setShowProductCatDropdown] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("")
















    const [quizTemplates, setQuizTemplates] = useState([]);
    const [selectedQuizTemplates, setSelectedQuizTemplates] = useState([]);


    const [mcqTemplates, setMcqTemplates] = useState([]);
    const [selectedMcqTemplates, setSelectedMcqTemplates] = useState([]);

    const [fileTemplates, setFileTemplates] = useState([]);
    const [selectedFileTemplates, setSelectedFileTemplates] = useState([]);


    const [showFileTempDropdown, setShowFileTempDropdown] = useState(false);
    const [showQuizTempDropdown, setShowQuizTempDropdown] = useState(false);
    const [showMcqTempDropdown, setShowMcqTempDropdown] = useState(false);


    const fileTempInputRef = useRef(null);
    const quizTempInputRef = useRef(null);
    const mcqTempInputRef = useRef(null);

    const navigate = useNavigate();

    const handleFileTempInputClick = () => {
        setShowFileTempDropdown(!showFileTempDropdown);
    };

    const handleQuizTempInputClick = () => {
        setShowQuizTempDropdown(!showQuizTempDropdown);
    };

    const handleMcqTempInputClick = () => {
        setShowMcqTempDropdown(!showMcqTempDropdown);
    };

    const productCatInputRef = useRef(null);

    const handleInputClick = () => {
        setShowProductCatDropdown(!showProductCatDropdown);
    };

    const handleOutsideClick = (e) => {
        if (productCatInputRef.current && !productCatInputRef.current.contains(e.target)) {
            setShowProductCatDropdown(false);
        }
        if (fileTempInputRef.current && !fileTempInputRef.current.contains(e.target)) {
            setShowFileTempDropdown(false);
        }

        if (quizTempInputRef.current && !quizTempInputRef.current.contains(e.target)) {
            setShowQuizTempDropdown(false)
        }

        if (mcqTempInputRef.current && !mcqTempInputRef.current.contains(e.target)) {
            setShowMcqTempDropdown(false)
        }
    };

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleClose = () => {
        setShowCreate(false);

    };

    const handleCreate = async () => {
        let fileTemplatesIds = []
        let mcqTemplatesIds = []
        let quizTemplatesIds = []

        selectedFileTemplates.forEach((file) => {
            fileTemplatesIds.push(file?._id)
        })

        selectedMcqTemplates.forEach((mcq) => {
            mcqTemplatesIds.push(mcq?._id)
        })

        selectedQuizTemplates.forEach((quiz) => {
            quizTemplatesIds.push(quiz?._id)
        })
        const addData = new FormData()
        addData.append("name", productName)
        addData.append("product", productImage)
        addData.append("category", selectedCat?._id)
        addData.append("real_price", realPrice)
        addData.append("discounted_price", discountedPrice)
        addData.append("star", star)

        addData.append("file_templates", JSON.stringify(fileTemplatesIds))
        addData.append("mcq_templates", JSON.stringify(mcqTemplatesIds))
        addData.append("quiz_templates", JSON.stringify(quizTemplatesIds))

        const createdData = await createProducts(addData)
        if (
            createdData?.success === "no" &&
            createdData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (createdData?.success === "no") {
            alert("system error try again leter");
        } else if (createdData?.success === "yes") {
            alert("products created successfully")
            handleClose()
            window.location.reload();
        }
    }

    const handleUpdate = async () => {
        let fileTemplatesIds = []
        let mcqTemplatesIds = []
        let quizTemplatesIds = []

        selectedFileTemplates.forEach((file) => {
            fileTemplatesIds.push(file?._id)
        })

        selectedMcqTemplates.forEach((mcq) => {
            mcqTemplatesIds.push(mcq?._id)
        })

        selectedQuizTemplates.forEach((quiz) => {
            quizTemplatesIds.push(quiz?._id)
        })

        const updateData = new FormData()
        updateData.append("product_id", productId)
        updateData.append("name", productName)
        updateData.append("product", productImage)
        updateData.append("category", selectedCat?._id)
        updateData.append("real_price", realPrice)
        updateData.append("discounted_price", discountedPrice)
        updateData.append("star", star.toString())

        updateData.append("file_templates", JSON.stringify(fileTemplatesIds))
        updateData.append("mcq_templates", JSON.stringify(mcqTemplatesIds))
        updateData.append("quiz_templates", JSON.stringify(quizTemplatesIds))

        const updatedData = await updateProducts(updateData)
        if (
            updatedData?.success == "no" &&
            updatedData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (updatedData?.success == "no") {
            alert("system error try again leter");
        } else if (updatedData?.success == "yes") {
            alert("product updated successfully")
            window.location.reload();
        }
    }

    const handleDelete = async (id) => {
        const deleteData = { product_id: id }
        const deletedData = await deleteProducts(deleteData)
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

            alert("product deleted successfully")
            window.location.reload();
        }
    }

    useEffect(() => {

        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        const fetcher = async () => {

            let categories = await fetchCategories();
            if (categories?.message === "jwt expired") {
                return navigate("/");
            } else {
                setCategories([...categories]);
            }

            let templatesData = await fetchTemplates();
            if (templatesData?.message === "jwt expired") {
                return navigate("/");
            } else {
                setFileTemplates([...templatesData]);
            }

            let quizzesData = await fetchQuizTemplates();
            if (quizzesData?.message === "jwt expired") {
                return navigate("/");
            } else {
                setQuizTemplates([...quizzesData]);
            }

            let mcqsData = await fetchMcqTemplates();
            if (mcqsData?.message === "jwt expired") {
                return navigate("/");
            } else {
                setMcqTemplates([...mcqsData]);
            }

            let products = await fetchProducts();
            // console.log("products", products)
            if (products?.message === "jwt expired") {
                return navigate("/");
            } else {
                setProducts([...products]);
            }

        };

        fetcher();
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            window.removeEventListener("resize", updateWindowWidth);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (update == true && showCreate == true) {

            document.getElementById("product-category").value = selectedCat?.name
        }
    }, [showCreate])

    return (
        <div>
            <Nav />
            <hr style={{ color: "black", margin: "0" }} />

            <div className="row">
                {windowWidth > 768 && <Sidebar activeOption="product-management" />}
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
                                setUpdate(false)
                                setShowCreate(true)
                            }}
                        >
                            <AddIcon />
                            <span className="ms-2">create products</span>
                        </button>
                    </div>


                    <table className="table mt-1 p-4 w-70 text-center">
                        <thead>
                            <tr className="table-primary table-striped">
                                <th scope="col">SN.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {(products && products?.length !== 0) ? (
                            products.map((prod, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="col">{index + 1}.</th>
                                        <th scope="col"> {prod?.name}</th>

                                        <th scope="col ">
                                            <CreateIcon
                                                className="text-primary border border-primary rounded me-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setUpdate(true);
                                                    setProductId(prod?._id)
                                                    setProductName(prod?.name)
                                                    setDbProductImage(prod?.image)
                                                    setSelectedCat(prod?.category)
                                                    setRealPrice(prod?.real_price)
                                                    setDiscountedPrice(prod?.discounted_price)
                                                    setStar(prod?.star)
                                                    setSelectedFileTemplates(prod?.file_templates)
                                                    setSelectedMcqTemplates(prod?.mcq_templates)
                                                    setSelectedQuizTemplates(prod?.quiz_templates)
                                                    setShowCreate(true);
                                                }}
                                            />
                                            <DeleteIcon
                                                className="text-danger border border-danger cursor-pointer rounded"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    handleDelete(prod?._id)
                                                }}
                                            />
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
                        {update ? "Update Product" : "Add Product"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="product-name"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="product-name "
                                value={productName}
                                className="form-control"
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="product-category"
                            >
                                select product category
                            </label>
                            <div className="dropdown" ref={productCatInputRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Select Product Category"
                                    onClick={handleInputClick}
                                    id="product-category"

                                />
                                {showProductCatDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {categories && categories.map((cat, _) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e) => {
                                                setSelectedCat(cat)
                                                document.getElementById("product-category").value = cat?.name
                                                setShowProductCatDropdown(false)
                                            }}>{cat?.name}</a></li>
                                        ))

                                        }
                                    </ul>
                                )}

                            </div>
                        </div>

                        {
                            dbProductImage && (
                                <div className="form-group mt-4">
                                    <label
                                        class="form-label"
                                        for="product-image"
                                    >
                                        Attached Product Image
                                    </label>
                                    <img

                                        alt="db-product-image"
                                        className="form-control"
                                        src={dbProductImage}
                                    />

                                </div>
                            )
                        }

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="product-image"
                            >
                                {update ? "Change Product Image" : "Product Image"}
                            </label>
                            <input
                                type="file"
                                id="product-image"
                                className="form-control"
                                onChange={(e) => {
                                    setProductImage(e.target.files[0])
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
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

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="real_price"
                            >
                                Real Price
                            </label>
                            <input
                                type="number"
                                id="real_price"
                                value={realPrice}
                                className="form-control"
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        alert("you can not set it below 0")
                                        return;
                                    }
                                    setRealPrice(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="discounted_price"
                            >
                                Discounted Price
                            </label>
                            <input
                                type="number"
                                id="discounted_price"
                                value={discountedPrice}
                                className="form-control"
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        alert("you can not set it below 0")
                                        return;
                                    }
                                    setDiscountedPrice(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="product-star"
                            >
                                Product Star
                            </label>
                            <input
                                type="number"
                                id="product-star"
                                value={star}
                                className="form-control"
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        alert("you can not set it below 0")
                                        return;
                                    }
                                    setStar(e.target.value)
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





        </div>
    )
}

export default ProductManagement