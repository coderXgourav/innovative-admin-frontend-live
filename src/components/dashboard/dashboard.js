import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { LoginProvider } from "../../context/loginContext";
import { useLogin } from "../../context/loginContext";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Avatar } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function Dashboard() {
  const [windowWidth, setWindowWidth] = useState();
  const [noOfUser, setNoOfUser] = useState(0);
  const [noOfActiveUser, setNoOfActiveUser] = useState(0);
  const [noOfExam, setNoOfExam] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [notices, setNotices] = useState(["notice1", "notice2", "notice3"]);
  const { loginValidity, setLoginValidity } = useLogin();

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <div>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="dashboard" />}
        <div className="col-md-10 p-4" style={{ background: "#F0F0F6",height:'90vh',overflowY:'auto' }}>
          <div className="d-flex row">
            <div className="col fw-bold">
              <h1
                style={{
                  fontSize: "28px",
                }}
              >
                Dashboard
              </h1>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              gap: "25px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: "65%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                    borderRadius: "6px",
                    background:
                      "linear-gradient(0deg, rgba(171,219,255,0.8463760504201681) 0%, rgba(255,255,255,1) 100%)",
                  }}
                  className="p-3"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderBottom: "1px solid lightgray",
                    }}
                    className="p-2"
                  >
                    <h3
                      style={{
                        fontSize: "25px",
                      }}
                    >
                      No of user
                    </h3>
                    <PeopleAltIcon
                      style={{
                        color: "#3c50e0",
                      }}
                      sx={{ height: "28px", width: "28px" }}
                    />
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    {noOfUser}
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: "6px",
                    boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                    background:
                      "linear-gradient(0deg, rgba(171,219,255,0.8463760504201681) 0%, rgba(255,255,255,1) 100%)",
                  }}
                  className="p-3"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderBottom: "1px solid lightgray",
                    }}
                    className="p-2"
                  >
                    <h3
                      style={{
                        fontSize: "25px",
                      }}
                    >
                      No of active user
                    </h3>
                    <GroupAddIcon
                      style={{
                        color: "#3c50e0",
                      }}
                      sx={{ height: "28px", width: "28px" }}
                    />
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    {noOfActiveUser}
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: "6px",
                    boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                    background:
                      "linear-gradient(0deg, rgba(171,219,255,0.8463760504201681) 0%, rgba(255,255,255,1) 100%)",
                  }}
                  className="p-3"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderBottom: "1px solid lightgray",
                    }}
                    className="p-2"
                  >
                    <h3
                      style={{
                        fontSize: "25px",
                      }}
                    >
                      No of exam
                    </h3>
                    <EventNoteIcon
                      style={{
                        color: "#3c50e0",
                      }}
                      sx={{ height: "28px", width: "28px" }}
                    />
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    {noOfExam}
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: "6px",
                    boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                    background:
                      "linear-gradient(0deg, rgba(171,219,255,0.8463760504201681) 0%, rgba(255,255,255,1) 100%)",
                  }}
                  className="p-3"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderBottom: "1px solid lightgray",
                    }}
                    className="p-2"
                  >
                    <h3
                      style={{
                        fontSize: "25px",
                      }}
                    >
                      Total Invoice Send
                    </h3>
                    <ReceiptIcon
                      style={{
                        color: "#3c50e0",
                      }}
                      sx={{ height: "28px", width: "28px" }}
                    />
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    {noOfExam}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                  }}
                >
                  User List
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "20px",
                    marginTop: "15px",
                    width: "100%",
                    background: "#e7e7e7",
                    borderRadius: "8px",
                  }}
                  className="p-2"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      boxShadow: "0px 0px 5px 8px #e7e7e7",
                    }}
                    className="p-2"
                  >
                    <h3 style={{ fontSize: "20px" }}>SERIAL NO.</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      boxShadow: "1px 1px 5px 8px #e7e7e7",
                    }}
                  >
                    <h3 style={{ fontSize: "20px" }}>NAME</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      boxShadow: "0px 0px 5px 8px #e7e7e7",
                    }}
                  >
                    <h3 style={{ fontSize: "20px" }}>ACTIONS</h3>
                  </div>
                </div>

                <div style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "10px",
                      marginTop: "5px",
                      width: "100%",
                    }}
                    className="p-2"
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: "600",
                        }}
                      >
                        1
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "0px !important",
                      }}
                    >
                      <Avatar />
                      <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                        User 1
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          border: "2px solid #3c50e0",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <EditRoundedIcon
                          style={{
                            color: "#3c50e0",
                          }}
                        />
                      </button>
                      <button
                        style={{
                          border: "2px solid #dc3545",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteRoundedIcon
                          style={{
                            color: "#dc3545",
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "10px",
                      marginTop: "5px",
                      width: "100%",
                    }}
                    className="p-2"
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: "600",
                        }}
                      >
                        2
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "0px !important",
                      }}
                    >
                      <Avatar />
                      <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                        User 2
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          border: "2px solid #3c50e0",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <EditRoundedIcon
                          style={{
                            color: "#3c50e0",
                          }}
                        />
                      </button>
                      <button
                        style={{
                          border: "2px solid #dc3545",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteRoundedIcon
                          style={{
                            color: "#dc3545",
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "10px",
                      marginTop: "5px",
                      width: "100%",
                    }}
                    className="p-2"
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: "600",
                        }}
                      >
                        3
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "0px !important",
                      }}
                    >
                      <Avatar />
                      <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                        User 3
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          border: "2px solid #3c50e0",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <EditRoundedIcon
                          style={{
                            color: "#3c50e0",
                          }}
                        />
                      </button>
                      <button
                        style={{
                          border: "2px solid #dc3545",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteRoundedIcon
                          style={{
                            color: "#dc3545",
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "10px",
                      marginTop: "5px",
                      width: "100%",
                    }}
                    className="p-2"
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: "600",
                        }}
                      >
                        4
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "0px !important",
                      }}
                    >
                      <Avatar />
                      <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                        User 4
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          border: "2px solid #3c50e0",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <EditRoundedIcon
                          style={{
                            color: "#3c50e0",
                          }}
                        />
                      </button>
                      <button
                        style={{
                          border: "2px solid #dc3545",
                          outline: "none",
                          borderRadius: "10px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteRoundedIcon
                          style={{
                            color: "#dc3545",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "35%",
              }}
            >
              <div
                style={{
                  boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                  borderRadius: "6px",
                  width: "90%",
                  margin: "0 auto",
                }}
                className="p-3"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    borderBottom: "1px solid lightgray",
                  }}
                  className="p-2"
                >
                  <h3
                    style={{
                      fontSize: "25px",
                    }}
                  >
                    Notice Board
                  </h3>
                  <CalendarTodayIcon
                    style={{
                      color: "#3c50e0",
                    }}
                    sx={{ height: "28px", width: "28px" }}
                  />
                </div>
                {notices.map((notice) => (
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "20px",
                      fontWeight: "600",
                      marginTop: "10px",
                      textTransform: "capitalize",
                    }}
                  >
                    {notice}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* <div
            className="mt-3 d-flex justify-content-between"
            style={{ marginLeft: "3%", marginRight: "5%" }}
          >
            <div
              className="d-inline-flex flex-column  p-2"
              style={{
                borderRadius: "16px",
                background: "#FFF",
                width: "25%",
                boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <h3>No of user</h3>

                <PeopleAltIcon
                  style={{
                    color: "#3c50e0",
                  }}
                  sx={{ height: "34px", width: "34px" }}
                />
              </div>
              <hr />
              <p className="d-flex justify-content-center fw-bold">
                {noOfUser}
              </p>
            </div>
            <div
              className="d-inline-flex flex-column p-2"
              style={{
                borderRadius: "16px",
                background: "#FFF",
                width: "30%",
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3>No of active user</h3>

                <div>
                  <GroupAddIcon
                    style={{
                      color: "#3c50e0",
                    }}
                    sx={{ height: "34px", width: "34px" }}
                  />
                </div>
              </div>
              <hr />
              <p className="d-flex justify-content-center fw-bold">
                {noOfActiveUser}
              </p>
            </div>
            <div
              className="d-inline-flex flex-column  p-2"
              style={{
                borderRadius: "16px",
                background: "#FFF",
                width: "25%",
                boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3>No of exam</h3>
                <EventNoteIcon
                  style={{
                    color: "#3c50e0",
                  }}
                  sx={{ height: "34px", width: "34px" }}
                />
              </div>

              <hr />
              <p className="d-flex justify-content-center fw-bold">
                {noOfExam}
              </p>
            </div>
          </div>

          <div
            className="d-flex justify-content-between"
            style={{ marginTop: "3%", marginLeft: "5%", marginRight: "5%" }}
          >
            <div
              className="d-inline-flex flex-column  p-2 "
              style={{
                borderRadius: "16px",
                background: "#FFF",

                boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                width: "40%",
                height: "60%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3 className="d-flex justify-content-center">
                  Total Invoice Send
                </h3>
                <ReceiptIcon
                  style={{
                    color: "#3c50e0",
                  }}
                  sx={{ height: "34px", width: "34px" }}
                />
              </div>
              <hr />
              <p className="d-flex justify-content-center fw-bold">
                {totalInvoice}
              </p>
            </div>
            <div
              className="d-inline-flex flex-column p-2 w-30"
              style={{
                borderRadius: "16px",
                background: "#FFF",

                boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                width: "40%",
                height: "100%",
              }}
            >
            <div style={{
              display:'flex',
              justifyContent:'space-around',
              alignItems:'center'
            }}>
              <h3 className="d-flex justify-content-center">Notice Board</h3>
              
              <CalendarTodayIcon style={{
                    color: "#3c50e0",
                  }}
                  sx={{ height: "34px", width: "34px" }}/>
            </div>

              <hr />
              {notices.map((notice) => (
                <p className="row d-flex justify-content-center">{notice}</p>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
