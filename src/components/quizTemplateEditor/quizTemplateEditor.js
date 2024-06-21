import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import {
  fetchQuizTemplates,
  createQuizTemplates,
  deleteQuizTemplates,
  updateQuizTemplates
} from "../../api-calls/apicalls";
import { useNavigate } from "react-router-dom";


function QuizTemplateEditor() {
  const [windowWidth, setWindowWidth] = useState();
  const [quizTemplates, setQuizTemplates] = useState([]);
  const [paperName, setPaperName] = useState("");
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quizzesCnt, setQuizzesCnt] = useState([]);
  const [optionsType, setOptionsType] = useState([]);
  const [templateOptImages, setTemplateOptImages] = useState([]);
  const [dbTemplateOptImages, setDbTemplateOptImages] = useState([]);
  const [templateOptTexts, setTemplateOptTexts] = useState([]);
  const [dbTemplateOptTexts, setDbTemplateOptTexts] = useState([]);
  const [answerImages, setAnswerImages] = useState([]);
  const [explainations, setExplainations] = useState([])
  const [banner, setBanner] = useState("")
  const [dbBanner, setDbBanner] = useState("")
  // const [marks, setMarks] = useState([])
  const [dbQuizzes, setDbQuizzes] = useState([])
  const [dbOptionsType, setDbOptionsType] = useState([]);
  const [editQuizDocId, setEditQuizDocId] = useState("")
  // const [dbMarks, setDbMarks] = useState([])
  const [dbAnswerImages, setDbAnswerImages] = useState([]);
  const [dbExplainations, setDbExplainations] = useState([])
  const [dbTextAnswers, setDbTextAnswers] = useState([])
  const [dbQuestions, setDbQuestions] = useState([])

  const navigate = useNavigate();

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClose = () => {
    setUpdate(false)
    setDbQuizzes([])
    setShowModal(false);
  };

  const handleQuizzesInputCnt = () => {
    const tempQuizzes = quizzesCnt;
    tempQuizzes.push(quizzesCnt.length + 1);
    setQuizzesCnt([...tempQuizzes]);
  };

  const handleSubBtns = (id, index) => {
    if (document.getElementById(`${id}`).value === "off") {
      document.getElementById(`${id}`).value = "on";
      let oppositeId = id;

      id.split("-").forEach((ele, index) => {
        if (index === 3) {
          id.split("-")[index] == "image"
            ? oppositeId.replace("image", "text")
            : oppositeId.replace("text", "image");
        }
      });

      document.getElementById(`${oppositeId}`).value = "off";

      let tempOptionsType = optionsType;
      if (id.includes("image")) {
        tempOptionsType[index] = "image";
      } else if (id.includes("text")) {
        tempOptionsType[index] = "text";
      }

      setOptionsType([...tempOptionsType]);
    } else if (document.getElementById(`${id}`).value == "on") {
      document.getElementById(`${id}`).value = "off";
      let oppositeId = id;

      id.split("-").forEach((ele, index) => {
        if (index === 3) {
          id.split("-")[index] == "image"
            ? oppositeId.replace("image", "text")
            : oppositeId.replace("text", "image");
        }
      });

      document.getElementById(`${oppositeId}`).value = "on";
      let tempOptionsType = optionsType;
      if (oppositeId.includes("image")) {
        tempOptionsType[index] = "image";
      } else if (oppositeId.includes("text")) {
        tempOptionsType[index] = "text";
      }

      setOptionsType([...tempOptionsType]);
    }
  };

  const imageFilesHandler = (e, operation, cntInd, optInd) => {
    let selectedImage = e.target.files[0];
    let tempTemplateImages = operation === "add" ? templateOptImages : dbTemplateOptImages;
    if (selectedImage.type !== "image/png") {
      alert("please select images");
      document.getElementById(`${operation}-opt-image-${cntInd}-${optInd}`).value = "";
      tempTemplateImages[cntInd].splice(1, optInd);
      return;
    } else if (
      Array.isArray(tempTemplateImages[cntInd]) &&
      tempTemplateImages[cntInd]?.length !== 0
    ) {
      tempTemplateImages[cntInd][optInd] = selectedImage;

      operation === "add" ? setTemplateOptImages([...tempTemplateImages]) : setDbTemplateOptImages([...tempTemplateImages]);
    } else {
      tempTemplateImages[cntInd] = [];
      tempTemplateImages[cntInd][optInd] = selectedImage;
      operation === "add" ? setTemplateOptImages([...tempTemplateImages]) : setDbTemplateOptImages([...tempTemplateImages]);
    }
  };

  const textOptHandler = (e, operation, cntInd, optInd) => {
    let selectedText = e.target.value;
    let tempTemplateTexts = templateOptTexts;

    if (
      Array.isArray(tempTemplateTexts[cntInd]) &&
      tempTemplateTexts[cntInd]?.length !== 0
    ) {
      tempTemplateTexts[cntInd][optInd] = selectedText;
      if (update) { document.getElementById(`db-opt-text-${cntInd}-${optInd}`).value = selectedText }
      operation === "add" ? setTemplateOptTexts([...tempTemplateTexts]) : setDbTemplateOptTexts([...tempTemplateTexts]);
    } else {
      tempTemplateTexts[cntInd] = [];
      tempTemplateTexts[cntInd][optInd] = selectedText;
      if (update) { document.getElementById(`db-opt-text-${cntInd}-${optInd}`).value = selectedText }
      operation === "add" ? setTemplateOptTexts([...tempTemplateTexts]) : setDbTemplateOptTexts([...tempTemplateTexts]);
    }
  };

  const answerImageFilesHandler = (e, operation, ind) => {
    // console.log(";;;",ind)
    let selectedImage = e.target.files[0];
    let tempAnswerImages = operation === "add" ? answerImages : dbAnswerImages;
    // console.log(selectedImage.type)
    if (selectedImage.type !== "image/png") {
      alert("please select images");
      document.getElementById(`add-img-answer-${ind}`).value = "";
      tempAnswerImages.splice(1, ind);
      return;
    } else {
      tempAnswerImages[ind] = selectedImage;
    }

    operation === "add" ? setAnswerImages([...tempAnswerImages]) : setDbAnswerImages([...tempAnswerImages]);
  };

  const handleCreate = async () => {
    let addData = new FormData();

    addData.append("paper_name", paperName);
    addData.append("banner", banner)
    optionsType.forEach((ot) => {
      addData.append("options_type", ot);
    });
    templateOptImages &&
      templateOptImages.length !== 0 &&
      templateOptImages.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            addData.append("options", tTemp);
          });
        }
      });
    answerImages &&
      answerImages.length !== 0 && answerImages.forEach((ai) => {
        // console.log(answerImages)
        // if(ai){
        addData.append("answers", ai);
        // }
      });

    templateOptTexts &&
      templateOptTexts.length !== 0 &&
      templateOptTexts.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            addData.append("text_options", tTemp);
          });
        }
      });

    let tempAnswerText = [];
    quizzesCnt.forEach((mc, ind) => {
      addData.append(
        "question",
        document.getElementById(`add-question-${ind}`).value
      );
      if (optionsType[ind] == "text") {
        tempAnswerText[ind] = document.getElementById(
          `add-text-answer-${ind}`
        ).value;
      }
    });

    if (tempAnswerText.length !== 0) {
      addData.append("answer_text", JSON.stringify(tempAnswerText));
    }


    explainations && explainations.length !== 0 && explainations.forEach((exp) => {
      addData.append("explaination", exp)
    })

    // marks && marks.length !== 0 && marks.forEach((mark) => {
    //   addData.append("mark", mark)
    // })

    let createdData = await createQuizTemplates(addData);
    // let tempCreatedData = [];
    // tempCreatedData.push(createdData);
    // setQuizTemplates([...quizTemplates, ...tempCreatedData]);
    // handleClose();
    // window.location.reload();
    if (
      createdData?.success === "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success === "no") {
      alert("system error try again leter");
    } else if (createdData?.success === "yes") {
      alert("quiz created successfully")
      handleClose()
      window.location.reload();
    }
  };

  // const handleMarks = async (e, operation, ind) => {
  //   let tempMarks = operation === "add" ? marks : dbMarks
  //   tempMarks[ind] = e.target.value
  //   operation === "add" ? setMarks([...tempMarks]) : setDbMarks([...tempMarks])
  // }

  // const handleDbQuestions = async (e, ind) => {
  //   let tempQuestions = dbQuestions
  //   tempQuestions[ind] = e.target.value
  //   setDbQuestions([...tempQuestions])
  // }

  const handleDelete = async (id) => {
    const deleteData = { quizDocId: id }
    const deletedData = await deleteQuizTemplates(deleteData)
    if (
      deletedData?.success === "no" &&
      deletedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (deletedData?.success === "no") {
      alert("system error try again leter");
    } else if (deletedData?.success === "yes") {
      alert("quiz template deleted successfully")
      handleClose()
      window.location.reload();
    }
  }

  const handleExplainations = async (e, operation, ind) => {
    let tempExplainations = operation === "add" ? explainations : dbExplainations
    tempExplainations[ind] = e.target.value
    operation === "add" ? setExplainations([...tempExplainations]) : setDbExplainations([...tempExplainations])
  }

  const handleUpdate = async () => {

    let updateData = new FormData()



    updateData.append("quizDocId", editQuizDocId)
    updateData.append("paper_name", paperName)
    { banner && updateData.append("banner", banner) }

    let updatedDataToBackend = []

    dbTemplateOptImages && dbTemplateOptImages.length !== 0 && dbTemplateOptImages.forEach((di, ind) => {
      if (di) {
        di.forEach((ele, eleInd) => {
          if (ele !== undefined) {
            updatedDataToBackend.push({

              "db_options_replacable_option_type": "image",
              "db_options_replacable_question_no": ind,
              "db_options_replacable_option_index": eleInd

            })
            updateData.append(`db_options`, ele)
          }
        })
      }
    })

    dbTemplateOptTexts && dbTemplateOptTexts.length !== 0 && dbTemplateOptTexts.forEach((di, ind) => {
      if (di) {
        di.forEach((ele, eleInd) => {
          if (ele !== undefined) {
            updatedDataToBackend.push({

              "db_options_text_replacable_option_type": "text",
              "db_options_text_replacable_question_no": ind,
              "db_options_text_replacable_option_index": eleInd,
              "db_options_text_data": ele
            })

          }
        })
      }
    })

    dbAnswerImages && dbAnswerImages.length !== 0 && dbAnswerImages.forEach((di, ind) => {
      if (di) {
        // console.log("294",dbAnswerImages)

        if (di !== undefined) {
          updatedDataToBackend.push({

            "db_answers_replacable_question_no": ind,


          })
          updateData.append(`db_answers`, di)
        }

      }
    })

    dbTextAnswers && dbTextAnswers.length !== 0 && dbTextAnswers.forEach((dta, ind) => {
      if (dta) {


        updatedDataToBackend.push({

          "db_text_answer_replacable_question_no": ind,
          "db_text_answer_replacable_option_type": "text",
          "db_text_answer_data": dta
        })


      }

    })

    dbExplainations && dbExplainations.length !== 0 && dbExplainations.forEach((dta, ind) => {
      if (dta) {


        updatedDataToBackend.push({

          "db_explaination_replacable_question_no": ind,
          "db_explaination_replacable_option_type": "text",
          "db_explaination_data": dta
        })


      }

    })

    // dbMarks && dbMarks.length !== 0 && dbMarks.forEach((dta, ind) => {
    //   if (dta) {


    //     updatedDataToBackend.push({

    //       "db_marks_replacable_question_no": ind,
    //       "db_marks_replacable_option_type": "text",
    //       "db_marks_data": dta
    //     })


    //   }

    // })

    dbQuestions && dbQuestions.length !== 0 && dbQuestions.forEach((dta, ind) => {
      if (dta) {


        updatedDataToBackend.push({

          "db_questions_replacable_question_no": ind,
          "db_questions_replacable_option_type": "text",
          "db_questions_data": dta
        })


      }

    })


    optionsType.forEach((ot) => {
      updateData.append("options_type", ot);
    });

    templateOptImages &&
      templateOptImages.length !== 0 &&
      templateOptImages.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            updateData.append("options", tTemp);
          });
        }
      });
    answerImages &&
      answerImages.length !== 0 && answerImages.forEach((ai) => {
        // console.log(answerImages)
        // if(ai){
        updateData.append("answers", ai);
        // }
      });

    templateOptTexts &&
      templateOptTexts.length !== 0 &&
      templateOptTexts.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            updateData.append("text_options", tTemp);
          });
        }
      });

    let tempAnswerText = [];
    quizzesCnt.forEach((_, ind) => {
      updateData.append(
        "question",
        document.getElementById(`add-question-${ind}`).value
      );
      if (optionsType[ind] == "text") {
        tempAnswerText[ind] = document.getElementById(
          `add-text-answer-${ind}`
        ).value;
      }
    });

    if (tempAnswerText.length !== 0) {
      updateData.append("answer_text", JSON.stringify(tempAnswerText));
    }


    explainations && explainations.length !== 0 && explainations.forEach((exp) => {
      updateData.append("explaination", exp)
    })

    // marks && marks.length !== 0 && marks.forEach((mark) => {
    //   updateData.append("mark", mark)
    // })

    updateData.append("updated_data", JSON.stringify(updatedDataToBackend))


    const updatedData = await updateQuizTemplates(updateData)

    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      alert("quiz template updated successfully")
      window.location.reload();
    }
  }

  const handleDbTextAnswers = (e, ind) => {
    let tempDbTextAnswers = dbTextAnswers

    tempDbTextAnswers[ind] = e.target.value
  }

  const handleDbQuestions = async (e, ind) => {
    let tempQuestions = dbQuestions
    tempQuestions[ind] = e.target.value
    setDbQuestions([...tempQuestions])
  }

  useEffect(() => {
    if (quizzesCnt.length !== 0) {
      const index = quizzesCnt.length - 1;
      document.getElementById(`add-option-type-text-${index}`).value = "off";
      document.getElementById(`add-option-type-image-${index}`).value = "off";
    }
  }, [quizzesCnt]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let quizTemplatesData = await fetchQuizTemplates();
      if (quizTemplatesData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setQuizTemplates([...quizTemplatesData]);
      }
    };

    fetcher();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    if (dbQuizzes && dbQuizzes.length !== 0) {

      let tempDbOptionsType = dbOptionsType
      dbQuizzes.forEach((dm, ind) => {
        if (dm?.options_type == "image") {
          console.log(document.getElementById(`db-option-type-image-${ind}`))
          document.getElementById(`db-option-type-image-${ind}`).checked = true
          tempDbOptionsType[ind] = "image"

        } else if (dm?.options_type == "text") {
          document.getElementById(`db-option-type-text-${ind}`).checked = true
          tempDbOptionsType[ind] = "text"
        }
      })

      setDbOptionsType([...tempDbOptionsType])
      dbQuizzes.forEach((dm, ind) => {
        if (dm?.options_type == "text") {
          dm.options.forEach((op, mInd) => {
            document.getElementById(`db-opt-text-${ind}-${mInd}`).value = op

          })
          document.getElementById(`db-text-answer-${ind}`).value = dm?.answer
        }

        else if (dm?.options_type == "image") {

          document.getElementById(`db-attached-img-answer-${ind}`).src = dm?.answer
        }

        // document.getElementById(`db-marks-${ind}`).value = dm?.mark
        document.getElementById(`db-explaination-${ind}`).value = dm?.explaination
        document.getElementById(`db-question-${ind}`).value = dm?.question
      })
    }
  }, [dbQuizzes])

  return (
    <div>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />

      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="quiz-template-editor" />}
        <div className="col-md-10 p-4" style={{ height: '90vh', overflowY: 'auto' }}>
          <div className="d-flex">


            <div className="fw-bold">
              {`Quiz Templates(${quizTemplates?.length || 0})`}
            </div>
            <div className="w-50 ms-3">

              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <button
              className="btn btn-outline-primary ms-2"
              type="search"

            >
              Search
            </button>
            <button
              className="btn ms-2"
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
              <span className="ms-2">Create</span>
            </button>

          </div>


          <table className="table mt-4 p-4 w-70 text-center">
            <thead>
              <tr className="table-primary table-striped">
                {/* <th scope="col">SN.</th> */}
                <th className="w-25">Quiz Template Name</th>
                <th className="w-25">View</th>
                <th className="w-25">Action</th>
              </tr>
            </thead>

            {quizTemplates && quizTemplates?.length !== 0 ? (
              quizTemplates.map((temp, index) => (
                <tbody>
                  <tr>
                    {/* <th scope="col">{index + 1}.</th> */}
                    <th className="w-25">{temp?.paper_name}</th>
                    <th className="w-25">
                      <Link to="/view-quiz-template" state={{ templateData: temp }}>
                        view
                      </Link>
                    </th>
                    <th className="w-25">
                      <CreateIcon
                        className="text-primary border border-primary rounded me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUpdate(true)
                          setShowModal(true)
                          setPaperName(temp?.paper_name)
                          setDbQuizzes(temp.quizzes)
                          setDbBanner(temp?.banner)
                          setEditQuizDocId(temp?._id)
                        }}
                      />
                      <DeleteIcon
                        className="text-danger border border-danger cursor-pointer rounded"
                        style={{ cursor: "pointer" }}

                        onClick={() => {
                          handleDelete(temp?._id)
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

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Templates" : "Add Templates"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">

            <div className="mb-2">
              <label className="pb-1">Paper Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Paper Name"
                value={paperName}
                onChange={(e) => {
                  for (let temp of quizTemplates) {
                    if (e.target.value === temp?.paper_name) {
                      alert("paper name already taken")
                      return;
                    }
                  }
                  setPaperName(e.target.value);
                }}
              />
            </div>


            {dbBanner && <div className="mb-2">
              <label className="pb-1">Attached Banner</label>
              <img

                className="form-control"
                src={dbBanner}
              />
            </div>}


            <div className="mb-2">
              <label className="pb-1">Banner</label>
              <input
                type="file"
                className="form-control"
                placeholder="Banner"
                onChange={(e) => {
                  setBanner(e.target.files[0])
                }}
              />
            </div>

            <div className="mb-2">
              {dbQuizzes && dbQuizzes.length !== 0 && (<>
                <label className="pb-1">Attached Quizzes</label>
                {
                  dbQuizzes.map((dm, ind) => (
                    <>
                      <div className="d-flex mt-2">
                        <p style={{ whiteSpace: "nowrap" }}>{`Q${ind + 1}.`}&nbsp;</p>
                        <input
                          type="text"
                          id={`db-question-${ind}`}
                          className="form-control"
                          placeholder="question"
                          onChange={(e) => {
                            handleDbQuestions(e, ind)
                          }}
                        />
                      </div>

                      <div className="d-flex mt-2 justify-content-center">
                        options type
                        {dm?.options_type == "text" && <div class="ms-4 form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name={`db-flexRadioDefault-${ind}`}
                            id={`db-option-type-text-${ind}`}

                          />
                          <label
                            class="form-check-label"
                            for={`db-option-type-text-${ind}`}
                          >
                            text
                          </label>
                        </div>}
                        {dm?.options_type == "image" && <div class="ms-2 form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name={`db-flexRadioDefault-${ind}`}
                            id={`db-option-type-image-${ind}`}

                          />
                          <label
                            class="form-check-label"
                            for={`db-option-type-image-${ind}`}
                          >
                            Image
                          </label>
                        </div>}
                      </div>


                      {dm?.options_type == "image" &&
                        dm.options.map((op, index) => (
                          <>

                            <p className="mt-3">already attached :<img src={op} alt="already attached image" className="h-50 w-50" /></p>
                            <p>changed already attached image:
                              <input
                                type="file"
                                id={`db-opt-image-${ind}-${index}`}
                                className="form-control mt-2"
                                placeholder="options images"
                                onChange={(e) => {
                                  imageFilesHandler(e, "update", ind, index);
                                }}
                              /></p>
                          </>
                        ))}



                      {dm?.options_type == "text" &&
                        dm.options.map((op, index) => (
                          <>
                            <input
                              type="text"
                              id={`db-opt-text-${ind}-${index}`}
                              className="form-control mt-2"
                              placeholder="options text"
                              onChange={(e) => {
                                textOptHandler(e, "update", ind, index);
                              }}
                            />
                          </>
                        ))}


                      {dm?.options_type == "text" && (
                        <div className="d-flex mt-2">
                          <p>answer:</p>
                          <input
                            type="text"
                            id={`db-text-answer-${ind}`}
                            className="form-control ms-2"
                            placeholder="answer"
                            onChange={(e) => {
                              handleDbTextAnswers(e, ind)
                            }}
                          />
                        </div>
                      )}

                      {dm?.options_type == "image" && (
                        <>
                          <div className="d-flex mt-2">
                            <p>attached answer:</p>
                            <img

                              id={`db-attached-img-answer-${ind}`}
                              className="ms-2 h-50 w-50"
                              alt="answer"

                            />
                          </div>
                          <div className="d-flex mt-2">
                            <p>answer:</p>
                            <input
                              type="file"
                              id={`db-img-answer-${ind}`}
                              className="form-control ms-2"
                              placeholder="answer"
                              onChange={(e) => {
                                answerImageFilesHandler(e, "update", ind);
                              }}
                            />

                          </div>
                        </>
                      )}

                      {/* <div className="d-flex mt-2">
                        <input placeholder="marks" id={`db-marks-${ind}`} onChange={(e) => {
                          handleMarks(e, "update", ind)
                        }} type="number" />
                      </div> */}

                      <div className="d-flex mt-2">
                        <textarea className="w-100" placeholder="explaination" id={`db-explaination-${ind}`} onChange={(e) => {
                          handleExplainations(e, "update", ind)
                        }} />
                      </div>


                    </>
                  ))
                }
              </>)}
            </div>

            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <label className="pb-1">Template Quizzes</label>
                <button
                  className="btn"
                  style={{
                    width: "fit-content",
                    background: "#cfb0cc",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handleQuizzesInputCnt();
                  }}
                >
                  add quiz <AddIcon />
                </button>
              </div>

              {quizzesCnt.length !== 0 &&
                quizzesCnt.map((data, ind) => (
                  <>
                    <div className="d-flex mt-2">
                      <p>{`Q${ind + 1}.`}&nbsp;</p>
                      <input
                        type="text"
                        id={`add-question-${ind}`}
                        className="form-control"
                        placeholder="question"
                      />
                    </div>

                    <div className="d-flex mt-2 justify-content-center">
                      options type
                      <div class="ms-4 form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`flexRadioDefault-${ind}`}
                          id={`add-option-type-text-${ind}`}
                          onChange={() => {
                            handleSubBtns(`add-option-type-text-${ind}`, ind);
                          }}
                        />
                        <label
                          class="form-check-label"
                          for={`add-option-type-text-${ind}`}
                        >
                          text
                        </label>
                      </div>
                      <div class="ms-2 form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`flexRadioDefault-${ind}`}
                          id={`add-option-type-image-${ind}`}
                          onChange={() => {
                            handleSubBtns(`add-option-type-image-${ind}`, ind);
                          }}
                        />
                        <label
                          class="form-check-label"
                          for={`add-option-type-image-${ind}`}
                        >
                          Image
                        </label>
                      </div>
                    </div>

                    {optionsType[ind] == "image" &&
                      [...Array(4)].map((_, index) => (
                        <>
                          <input
                            type="file"
                            id={`add-opt-image-${ind}-${index}`}
                            className="form-control mt-2"
                            placeholder="options images"
                            onChange={(e) => {
                              imageFilesHandler(e, "add", ind, index);
                            }}
                          />
                        </>
                      ))}

                    {optionsType[ind] == "text" &&
                      [...Array(4)].map((_, index) => (
                        <>
                          <input
                            type="text"
                            id={`add-opt-text-${ind}-${index}`}
                            className="form-control mt-2"
                            placeholder="options text"
                            onChange={(e) => {
                              textOptHandler(e, "add", ind, index);
                            }}
                          />
                        </>
                      ))}

                    {optionsType[ind] == "text" && (
                      <div className="d-flex mt-2">
                        <p>answer:</p>
                        <input
                          type="text"
                          id={`add-text-answer-${ind}`}
                          className="form-control ms-2"
                          placeholder="answer"
                        />
                      </div>
                    )}

                    {optionsType[ind] == "image" && (
                      <div className="d-flex mt-2">
                        <p>answer:</p>
                        <input
                          type="file"
                          id={`add-img-answer-${ind}`}
                          className="form-control ms-2"
                          placeholder="answer"
                          onChange={(e) => {
                            answerImageFilesHandler(e, "add", ind);
                          }}
                        />
                      </div>
                    )}

                    {/* <div className="d-flex mt-2">
                      <input placeholder="marks" onChange={(e) => {
                        handleMarks(e, "add", ind)
                      }} type="number" />
                    </div> */}

                    <div className="d-flex mt-2">
                      <textarea className="w-100" placeholder="explaination" onChange={(e) => {
                        handleExplainations(e, "add", ind)
                      }} />
                    </div>
                  </>
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
    </div>
  );
}

export default QuizTemplateEditor;