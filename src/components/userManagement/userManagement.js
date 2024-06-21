import React from 'react';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { fetchUsers } from '../../api-calls/apicalls';
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import { createUsers, updateUsers, deleteUsers } from "../../api-calls/apicalls";
import { useNavigate } from 'react-router-dom';


function UserManagement() {
  const [windowWidth, setWindowWidth] = useState();
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [userId, setUserId] = useState("")

  const navigate = useNavigate()

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone_no: phone,
      email: email,
      role: role,
      password: password
    }
    const createdData = await createUsers(userData)
    if (
      createdData?.success === "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success === "no") {
      alert("system error try again leter");
    } else if (createdData?.success === "yes") {
      alert("user created successfully")
      handleClose()
      window.location.reload();
    }
  }

  const handleUpdate = async () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone_no: phone,
      email: email,
      role: role,
      user_id: userId
    }

    if (password !== "") {
      userData.password = password
    }

    const updatedData = await updateUsers(userData)
    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      alert("user data updated successfully")
      window.location.reload();
    }
  }

  const handleRole = (e) => {
    setRole(e.target.value)
  }

  const handleDelete = async (id) => {
    const deleteData = { user_id: id }
    const deletedData = await deleteUsers(deleteData)
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

      alert("user deleted successfully")
      window.location.reload();
    }
  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let usersData = await fetchUsers();
      // console.log("27", usersData)
      if (usersData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setUsers([...usersData]);
      }
    };

    fetcher();
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [])


  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: '0' }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="user-management" />}
        <div className="col-md-10 p-4" style={{ height:'90vh',overflowY:'auto' }}>
        
          <div className="d-flex">
            <div className="fw-bold">
              {`Users(${users.length - 1})`}
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
                <th  className='w-25'>Name</th>
                <th className='w-25'>Action</th>
              </tr>
            </thead>
            {users.length !== 0 && users.map((user, ind) =>
              user.email !== "admin@gmail.com" && (
                <tbody>
                  <tr >
                    {/* <th scope="col">{ind + 1}</th> */}
                    <th className='w-25'> {user?.first_name + " " + user?.last_name}</th>

                    <th className='w-25'>
                      <CreateIcon
                        className="text-primary border border-primary rounded me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUpdate(true)
                          setShowModal(true);
                          setFirstName(user?.first_name)
                          setLastName(user?.last_name)
                          setEmail(user?.email)
                          setPhone(user?.phone_no)
                          setPassword("")
                          setRole(user?.role)
                          setUserId(user?._id)
                        }}
                      />
                      <DeleteIcon
                        className="text-danger border border-danger cursor-pointer rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDelete(user?._id)
                        }}
                      />
                    </th>
                  </tr>
                </tbody>
              )

            )}



          </table>

        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Users" : "Add Users"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">
            <div className="mb-2">
              <label className="pb-1">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Phone No</label>
              <input
                type="text"
                className="form-control"
                placeholder="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="pb-1">Role</label>
              <select value={role} onChange={handleRole} className="form-control">
                <option defaultValue="select role">Select Role</option>
                <option>User 1</option>
                <option>User 2</option>
                <option>User 3</option>
              </select>
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
            {update ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserManagement