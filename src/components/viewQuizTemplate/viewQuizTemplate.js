import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import "./viewQuizTemplate.css";
import dotted from "../../assets/Dotted.png";
import line from "../../assets/Line.png";
import rightPng from "../../assets/Right.png";
import { verifyToken } from "../../api-calls/apicalls";
import correct from "../../assets/correct.png"
import incorrect from "../../assets/incorrect.png"

function ViewMcqTemplate() {
  const location = useLocation();
  // const ADMIN_EMAIL="admin@gmail.com" //temporary
  const { templateData } = location.state;
  const [windowWidth, setWindowWidth] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [explaination, setExplaination] = useState("");
  const [explainationColor, setExplainationColor] = useState("");
  const [ans, setAns] = useState([])
  const [showAns, setShowAns] = useState(false)
  const [sign, setSign] = useState([])
  const [nextClicked, setNextClicked] = useState([])
  const [ansSigns, setAnsSigns] = useState([])
  const ALPHABET = ["A", "B", "C", "D"]

  const navigate = useNavigate();

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleSaveAndNext = async () => {

    let tempNextClicked = nextClicked
    tempNextClicked.push("clicked") //clicke used for just for mock data
    setNextClicked([...nextClicked])

    let tempSign = sign
    let tempAns = ans
    let tempPageNo = pageNumber;

    if (isNaN(tempAns[tempPageNo - 1])) {
      tempAns[tempPageNo - 1] = "unattempted"
      setAns([...tempAns])
    }

    tempSign[pageNumber - 1] = "right"
    setSign([...tempSign])

    if (tempPageNo === templateData?.quizzes?.length) {
      setShowAns(true)
      return;
    }

    document.getElementById(`dotted-${tempPageNo - 1}`).style.display = "none";
    document.getElementById(`line-${tempPageNo - 1}`).style.display = "flex";

    setExplaination("")
    setPageNumber(tempPageNo + 1);
  };

  const handleClickedOption = (type, ind) => {


    templateData &&
      templateData?.quizzes?.length !== 0 &&
      templateData.quizzes[pageNumber - 1].options.forEach((op, opInd) => {

        if (opInd === ind) {
          setExplainationColor("#03A500");

          let tempAns = ans
          tempAns[pageNumber - 1] = ind
          setAns([...tempAns])

          setExplaination(templateData.quizzes[pageNumber - 1].explaination);
          document.getElementById(`main-div-${type}-option-${opInd}`).style.border = "2px solid #5DC1F2"
          templateData.quizzes[pageNumber - 1].options.forEach((_, opInd) => {
            document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
              event.stopPropagation();
            });
          })
        }
      });
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const verifier = async () => {
      const verifiedTokenData = await verifyToken()

      if (verifiedTokenData?.message === "jwt expired") {
        return navigate("/");
      }
    }

    verifier()


    !showAns &&
      templateData &&
      templateData?.quizzes?.length !== 0 &&
      templateData?.quizzes.forEach((_, ind) => {
        if (ind === templateData?.quizzes.length - 1) {
          document.getElementById(`dotted-${ind}`).style.display = "none";
          document.getElementById(`line-${ind}`).style.display = "none";
        } else {
          document.getElementById(`dotted-${ind}`).style.display = "flex";
          document.getElementById(`line-${ind}`).style.display = "none";
        }
      })
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);


  useEffect(() => {
    if (showAns == false) {
      setTimeout(async () => {
        if (nextClicked[pageNumber - 1] !== "clicked") {
          await handleSaveAndNext();
        }
      }, 10000);
    }

  })

  useEffect(() => {
    // console.log("ans", ans)
    let tempAnsSign = []
    if (ans.length === templateData?.quizzes?.length) {

      for (let i = 0; i < templateData.quizzes.length; i++) {
        for (let j = 0; j < templateData.quizzes[i].options.length; j++) {

          if (templateData.quizzes[i].answer === templateData.quizzes[i].options[j] && ans[i] == j) {
            tempAnsSign[i] = "correct"
            break;
          } else {
            tempAnsSign[i] = "incorrect"
          }
        }
      }
      // console.log("PPPPP",tempAnsSign)
      setAnsSigns([...tempAnsSign])
    }

  }, [ans])

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="quiz-temp-editor" />}
        <div className="col-md-10  p-4"
          style={{ height: '90vh', overflowY: 'auto' }}
        >
          {showAns ?
            <>
              {/* <button className="btn" onClick={()=>{window.location.reload()}}>Back Only For Admin</button> */}
              {templateData.quizzes.map((quiz, index) => (
                <div className="d-flex justify-content-start View_quiz_template_quiz mt-3 flex-column">
                  <div className="d-flex">
                    <h5 className="ms-3 mt-3" style={{ whiteSpace: "nowrap" }}>{quiz?.question}</h5>
                    {ansSigns[index] === "correct" ? <img src={correct} className="mt-3 ms-3" alt="correct" style={{ height: "2%", width: "2%" }} /> : <img className="mt-3 ms-3" style={{ height: "2%", width: "2%" }} src={incorrect} alt="incorrect" />}
                  </div>
                  {ans[index] === "unattempted" ? <p className="View_quiz_template_not_attempted">Not Attempted</p> :
                    (
                      <div className="container">
                        <div class="View_quiz_template_options_super_main row gap-3 ms-3 mb-3   " >
                          {quiz.options.map((op, ind) => (

                            <div class="View_quiz_template_options_main border border-secondary p-0">
                              {quiz?.options_type === "image" ? (
                                <>
                                  <p>{`${ALPHABET[ind]}.`}</p>
                                  <img
                                    className="View_quiz_template_options_img"
                                    id={`img-option-${ind}`}
                                    src={op}
                                    alt="op-img"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  />
                                  {quiz.answer === op ? <p className="View_quiz_template_correct_answer">correct answer</p> : ""}
                                  {ans[index] === ind && quiz.answer != op ? <p className="View_quiz_template_incorrect_answer">incorrect answer</p> : ""}
                                </>
                              ) : (
                                <>
                                  <p>{`${ALPHABET[ind]}.`}</p>
                                  <div
                                    className="View_quiz_template_options_text"
                                    id={`text-option-${ind}`}
                                    style={{
                                      cursor: "pointer"
                                    }}
                                  >
                                    {op}
                                  </div>
                                  {quiz.answer === op ? <p className="View_quiz_template_correct_answer">correct answer</p> : ""}
                                  {ans[index] === ind && quiz.answer != op ? <p className="View_quiz_template_incorrect_answer">incorrect answer</p> : ""}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </> :
            <>
              {templateData &&

                (

                  <>
                    <h1>{templateData?.paper_name}</h1>
                    <img className="w-100" alt="banner" src={templateData?.banner} />
                  </>
                )


              }

              {templateData && templateData?.quizzes?.length !== 0 && (
                <div className="d-flex View_quiz_template_pagination_mainWrapper mt-3">
                  {templateData?.quizzes?.map((_, ind) => (
                    <>
                      {sign[ind] === "right" ?
                        <img className={"View_quiz_template_right mt-3 " +
                          (ind === 0 ? "ms-2" : "")
                        } id={`right-${ind}`} src={rightPng} alt="right" />
                        :
                        <p
                          className={
                            "View_quiz_template_page_no mt-3 " +
                            (ind === 0 ? "ms-2" : "")
                          }
                          id={`page-no-${ind}`}
                        >
                          {ind + 1}
                        </p>}
                      <img
                        id={`dotted-${ind}`}
                        alt="dotted"
                        src={dotted}
                        className="h-50 ms-2 me-2 View_quiz_template_line"
                      />
                      <img
                        id={`line-${ind}`}
                        alt="line"
                        src={line}
                        className="h-50 ms-2 me-2 View_quiz_template_line"
                      />
                    </>
                  ))}
                </div>
              )}

              <h3 className="mt-5 mb-3">
                Qustion {pageNumber} of {templateData.quizzes.length}
              </h3>

              <div className="d-flex justify-content-start View_quiz_template_quiz">
                {templateData &&
                  templateData?.quizzes?.length !== 0 &&
                  templateData.quizzes.map((quiz, quizInd) => (
                    <>
                      {quizInd + 1 === pageNumber && (
                        <div class="d-inline-flex flex-column mt-3 px-4 mb-3">
                          <h5 className="ms-3 mt-1" style={{ whiteSpace: "nowrap" }}>
                            {quizInd + 1 === pageNumber ? quiz?.question : ""}
                          </h5>
                          <div class="row gap-3 mt-5 ms-3 mb-3" >
                            {quiz.options.map((op, ind) => (
                              <div class=" View_quiz_template_options_main border border-secondary p-0">
                                {quiz?.options_type === "image" ? (
                                  <div id={`main-div-img-option-${ind}`} className="w-100">
                                    <p>{`${ALPHABET[ind]}.`}</p>

                                    <img
                                      className="View_quiz_template_options_img"
                                      id={`img-option-${ind}`}
                                      src={op}
                                      alt="op-img"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        handleClickedOption("img", ind);
                                      }}
                                    />
                                  </div>

                                ) : (
                                  <div id={`main-div-text-option-${ind}`} className="w-100">
                                    <p>{`${ALPHABET[ind]}.`}</p>


                                    <div
                                      className="View_quiz_template_options_text"
                                      id={`text-option-${ind}`}
                                      style={{
                                        cursor: "pointer"
                                      }}
                                      onClick={() => {
                                        handleClickedOption("text", ind);
                                      }}
                                    >
                                      {op}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>

              {/* {explaination && (
                <div
                  className="d-flex justify-content-center mt-3"
                  style={{ color: `${explainationColor}` }}
                >
                  {explaination}
                </div>
              )} */}

              <div className="d-flex justify-content-center mt-5">
                <button
                  className="btn btn-primary rounded"
                  onClick={() => {
                    handleSaveAndNext();
                  }}
                >
                  save and next
                </button>
              </div>
            </>}
        </div>
      </div>
    </>
  );
}

export default ViewMcqTemplate;
