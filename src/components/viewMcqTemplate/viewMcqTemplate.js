import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import "./viewMcqTemplate.css";
import dotted from "../../assets/Dotted.png";
import line from "../../assets/Line.png";
import rightPng from "../../assets/Right.png";
import wrongPng from "../../assets/Wrong.png";
import { updateMcqTemplatesAttempts, verifyToken } from "../../api-calls/apicalls";
import correct from "../../assets/correct.png"
import incorrect from "../../assets/incorrect.png"

function ViewMcqTemplate() {
  const location = useLocation();
  const ADMIN_EMAIL = "admin@gmail.com" //temporary
  const { templateData } = location.state;
  const [ansSigns, setAnsSigns] = useState([])
  const [windowWidth, setWindowWidth] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [explaination, setExplaination] = useState("");
  const [explainationColor, setExplainationColor] = useState("");
  const [ans, setAns] = useState([])
  const [showAns, setShowAns] = useState(false)
  const [sign, setSign] = useState([])
  const [answered, setAnswered] = useState(false)
  const navigate = useNavigate()
  const ALPHABET = ["A", "B", "C", "D"]

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleSaveAndNext = async () => {

    let tempSign = sign
    let tempAns = ans
    let tempPageNo = pageNumber;

    // console.log("temppp",tempPageNo)

    if (answered == false) {

      tempAns[tempPageNo - 1] = "unattempted"
      setAns([...tempAns])
    } else if (answered == true) {
      setAnswered(false)
    }

    let dbAns = []
    tempAns.forEach((t) => {
      if (t !== "unattempted") {
        dbAns.push(t.toString())
      } else {
        dbAns.push("unattempted")
      }
    })

    // console.log("dbbb",dbAns)
    let updateData = { update_attempt: "yes", mcqDocId: templateData?._id, user_email: ADMIN_EMAIL, last_visited_question: pageNumber, given_answers: dbAns }

    await updateMcqTemplatesAttempts(updateData)


    if (tempPageNo == templateData?.mcqs?.length) {
      setShowAns(true)
      return;
    }


    document.getElementById(`dotted-${pageNumber - 1}`).style.display = "none";
    document.getElementById(`line-${pageNumber - 1}`).style.display = "flex";



    templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
      if (ans[pageNumber - 1] === "unattempted") {
        tempSign[pageNumber - 1] = "unsigned"
        setSign([...tempSign])
      } else if (templateData.mcqs[pageNumber - 1].answer === templateData.mcqs[pageNumber - 1].options[ans[pageNumber - 1]]) {
        tempSign[pageNumber - 1] = "right"
        setSign([...tempSign])
      } else if (templateData.mcqs[pageNumber - 1].answer !== templateData.mcqs[pageNumber - 1].options[ans[pageNumber - 1]]) {
        tempSign[pageNumber - 1] = "wrong"
        setSign([...tempSign])
      }
    })


    setExplaination("")
    setPageNumber(tempPageNo + 1);
  };

  const handleClickedOption = (type, ind) => {
    // console.log("click",ind)
    templateData &&
      templateData?.mcqs?.length !== 0 &&
      templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
        if (opInd === ind) {
          if (op === templateData.mcqs[pageNumber - 1].answer) {
            // console.log("{correct}",opInd+"---"+ind)
            setExplainationColor("#03A500");

            setAnswered(true)

            let tempAns = ans
            tempAns[pageNumber - 1] = ind
            setAns([...tempAns])

            setExplaination(templateData.mcqs[pageNumber - 1].explaination);

            document.getElementById(`main-div-${type}-option-${ind}`).style.border = "6px solid #D4FFD6";

            templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
              document.getElementById(`main-div-${type}-option-${opInd}`).addEventListener("click", function (event) {
                event.stopPropagation();
              });
            })


          } else {
            // console.log("{incorrect}",opInd+"---"+ind)

            setExplainationColor("#03A500");

            setAnswered(true)

            let tempAns = ans
            tempAns[pageNumber - 1] = ind
            setAns([...tempAns])

            setExplaination(templateData.mcqs[pageNumber - 1].explaination);

            document.getElementById(`main-div-${type}-option-${ind}`).style.border = "6px solid #FFD4D4";

            templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
              if (op === templateData.mcqs[pageNumber - 1].answer) {
                document.getElementById(`main-div-${type}-option-${opInd}`).style.border = "6px solid #D4FFD6";
              }
            })

            templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
              document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
                event.stopPropagation();
              });
            })

          }

        }
      });
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const verifier = async () => {
      const verifiedTokenData = await verifyToken()

      if (verifiedTokenData?.message === "jwt expired") {
        navigate("/");
      }
    }

    verifier()

    !showAns &&
      templateData &&
      Array.isArray(templateData?.attempted) &&
      templateData?.attempted?.length !== 0 ?
      templateData?.attempted.forEach((tat, _) => {
        if (tat?.user_email === ADMIN_EMAIL) {
          let tempAns = []

          // console.log("230")

          //change lines
          for (let i = 0; i < parseInt(tat?.last_visited_question); i++) {
            if (i == templateData?.mcqs?.length - 1) {
              document.getElementById(`dotted-${i}`).style.display = "none";
              document.getElementById(`line-${i}`).style.display = "none";
            } else {
              document.getElementById(`dotted-${i}`).style.display = "none";
              document.getElementById(`line-${i}`).style.display = "flex";
            }
          }

          for (let i = parseInt(tat?.last_visited_question); i < templateData?.mcqs?.length; i++) {
            if (i == templateData?.mcqs?.length - 1) {
              document.getElementById(`dotted-${i}`).style.display = "none";
              document.getElementById(`line-${i}`).style.display = "none";
            } else {
              document.getElementById(`dotted-${i}`).style.display = "none";
              document.getElementById(`line-${i}`).style.display = "flex";
            }
          }




          //change signs
          for (let ga = 0; ga < tat?.given_answers?.length; ga++) {
            if (tat?.given_answers[ga] == "unattempted") {
              let tempSign = sign
              tempSign[ga] = "unsigned"
              setSign([...tempSign])
            } else if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] === templateData?.mcqs[ga]?.answer) {




              let tempSign = sign
              tempSign[ga] = "right"
              setSign([...tempSign])
            } else if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] !== templateData?.mcqs[ga]?.answer) {


              let tempSign = sign
              tempSign[ga] = "wrong"
              setSign([...tempSign])
            }


            tempAns[ga] = tat?.given_answers[ga] == "unattempted" ? "unattempted" : parseInt(tat?.given_answers[ga])

          }

          for (let sga = tat?.given_answers?.length; sga < templateData?.mcqs?.length; sga++) {
            let tempSign = sign
            tempSign[sga] = "unsigned"
            setSign([...tempSign])
          }

          tempAns.length !== 0 && setAns([...tempAns])
          parseInt(tat?.last_visited_question) == templateData?.mcqs?.length ? setShowAns(true) : setPageNumber(parseInt(tat?.last_visited_question) + 1)

        }

      }) : templateData?.mcqs.forEach((tat, _) => {

        //  console.log("283")

        for (let i = 0; i < templateData?.mcqs?.length; i++) {
          if (i === templateData?.mcqs.length - 1) {
            document.getElementById(`dotted-${i}`).style.display = "none";
            document.getElementById(`line-${i}`).style.display = "none";
          } else {
            document.getElementById(`dotted-${i}`).style.display = "none";
            document.getElementById(`line-${i}`).style.display = "flex";
          }
        }





        for (let ga = 0; ga < templateData?.mcqs?.length; ga++) {
          let tempSign = sign
          tempSign[ga] = "unsigned"
          setSign([...tempSign])


        }




      })






    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    let tempAnsSign = []
    if (ans.length === templateData?.mcqs?.length) {

      for (let i = 0; i < templateData.mcqs.length; i++) {
        for (let j = 0; j < templateData.mcqs[i].options.length; j++) {

          if (templateData.mcqs[i].answer === templateData.mcqs[i].options[j] && ans[i] == j) {
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
        {windowWidth > 768 && <Sidebar activeOption="mcq-temp-editor" />}
        <div className="col-md-10  p-4"
          style={{
            height: "500px",
            overflowY: "scroll"
          }}
        >
          {showAns ?
            <>
              {templateData.mcqs.map((mcq, index) => (
                <div className="d-flex justify-content-start View_mcq_template_mcq mt-3    flex-column                     ">
                  <div className="d-flex">
                    <h5 className="ms-3 mt-3" style={{ whiteSpace: "nowrap" }}>{mcq?.question}</h5>
                    {ansSigns[index] === "correct" ? <img src={correct} className="mt-3 ms-3" alt="correct" style={{ height: "2%", width: "2%" }} /> : <img className="mt-3 ms-3" style={{ height: "2%", width: "2%" }} src={incorrect} alt="incorrect" />}
                  </div>

                  {ans[index] === "unattempted" ? <p className="View_mcq_template_not_attemted">Not Attempted</p> :
                    (
                      <div className="container">
                        <div class="View_mcq_template_options_super_main row gap-3 ms-3 mb-3 " >
                          {mcq.options.map((op, ind) => (

                            <div class="View_mcq_template_options_main border border-secondary p-0">
                              {mcq?.options_type === "image" ? (
                                <>
                                  <p>{`${ALPHABET[ind]}.`}</p>
                                  <img
                                    className="View_mcq_template_options_img"
                                    id={`img-option-${ind}`}
                                    src={op}
                                    alt="op-img"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  />
                                  {mcq.answer === op ? <p className="View_mcq_template_correct_answer">correct answer</p> : ""}
                                  {ans[index] === ind && mcq.answer != op ? <p className="View_mcq_template_incorrect_answer">incorrect answer</p> : ""}
                                </>
                              ) : (
                                <>
                                  <p>{`${ALPHABET[ind]}.`}</p>
                                  <div
                                    className="View_mcq_template_options_text"
                                    id={`text-option-${ind}`}
                                    style={{
                                      cursor: "pointer"
                                    }}
                                  >
                                    {op}
                                  </div>
                                  {mcq.answer === op ? <p className="View_mcq_template_correct_answer">correct answer</p> : ""}
                                  {ans[index] === ind && mcq.answer != op ? <p className="View_mcq_template_incorrect_answer">incorrect answer</p> : ""}
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

              {templateData && templateData?.mcqs?.length !== 0 && (
                <div className="d-flex View_mcq_template_pagination_mainWrapper mt-3">
                  {templateData?.mcqs?.map((_, ind) => (
                    <>
                      {sign[ind] === "right" &&
                        <img className={"View_mcq_template_right mt-2 mb-2 " +
                          (ind === 0 ? "ms-3" : "")
                        } id={`right-${ind}`} src={rightPng} alt="right" />}
                      {sign[ind] === "wrong" &&
                        <img className={"View_mcq_template_right mt-2 mb-2 " +
                          (ind === 0 ? "ms-3" : "")
                        } id={`wrong-${ind}`} src={wrongPng} alt="wrong" />}
                      {sign[ind] === "unsigned" &&
                        <p
                          className={
                            "View_mcq_template_page_no mt-2 mb-2 " +
                            (ind === 0 ? "ms-3" : "")
                          }
                          id={`page-no-${ind}`}
                        >
                          {ind + 1}
                        </p>}
                      <img
                        id={`dotted-${ind}`}
                        alt="dotted"
                        src={dotted}
                        className="h-50 ms-2 me-2 mt-4"
                      />
                      <img
                        id={`line-${ind}`}
                        alt="line"
                        src={line}
                        className="h-50 ms-2 me-2 mt-4"
                      />
                    </>
                  ))}
                </div>
              )}
              <h3 className="mt-5 mb-3">
                Qustion {pageNumber} of {templateData.mcqs.length}
              </h3>

              <div className="d-flex justify-content-start View_mcq_template_mcq">
                {templateData &&
                  templateData?.mcqs?.length !== 0 &&
                  templateData.mcqs.map((mcq, mcqInd) => (
                    <>
                      {mcqInd + 1 === pageNumber && (
                        <div class="d-inline-flex flex-column mt-3 px-4 mb-3">
                          <h5 className="ms-3 mt-1" style={{ whiteSpace: "nowrap" }}>
                            {mcqInd + 1 === pageNumber ? mcq?.question : ""}
                          </h5>
                          <div class="row gap-3 mt-5 ms-3 mb-3" >
                            {mcq.options.map((op, ind) => (
                              <div class=" View_mcq_template_options_main border border-secondary p-0">
                                {mcq?.options_type === "image" ? (
                                  <div id={`main-div-img-option-${ind}`} className="w-100">
                                    <p>{`${ALPHABET[ind]}.`}</p>
                                    <img
                                      className="View_mcq_template_options_img"
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
                                      className="View_mcq_template_options_text"
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
              {explaination && (
                <div
                  className="d-flex justify-content-center mt-3"
                  style={{ color: `${explainationColor}` }}
                >
                  {explaination}
                </div>
              )}
              <div className="d-flex justify-content-center mt-5">
                <button
                  id="save_next"
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
