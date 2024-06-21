import React, { useState } from "react";
// import useState from 'react';
import "./navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../sidebar/sidebar";
import logo from "../../assets/logo2.png";
import { Modal, Button } from "react-bootstrap";
import { Avatar } from "@mui/material";

const Nav = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  // const activeMenu=()=>{
  //   setOpenMenu(true)
  // }

  // const closeMenu=()=>{
  //   setOpenMenu(false)
  // }

  const handleClose = () => {
    setShowAccountDetails(false);
  };

  return (
    <div style={{
      background:'#202020',
      position:'sticky',
      top:'0',
      zIndex:99999
    }} className="py-1">
      <nav
        id="navLargeScreenBar"
        className="navbar navbar-expand-lg bg-black headernavbar"
      >
        <div className="container-fluid" style={{
          width:'95%'
        }}>
          <a className="navbar-brand" href="/dashboard">
            <img alt="logo" src={logo} width={75} height={75} />
          </a>

          <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            gap:'14px',
            cursor:'pointer'
          }} onClick={setShowAccountDetails}>
            <div style={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'flex-end',
              
            }}>
              <h3 style={{                
                fontWeight:'bold',
                fontSize:'20px',                
                color:'white',
                textTransform:'capitalize',
                margin:'0px 0px'
              }}>User Name</h3>
              <p style={{
                color:'lightgray',
                margin:'0px 0px'
              }}>user info</p>
            </div>
            <Avatar />
          </div>
        </div>
      </nav>

      <nav
        id="navMobileBar"
        className="navbar navbar-expand-lg headernavbar bg-primary"
      >
        <div className="container-fluid">
          <MenuIcon onClick={() => setOpenMenu(true)} />
          <a className="navbar-brand" href="/dashboard">
            <img alt="logo" src={logo} width={65} height={65} />
          </a>
          <AccountCircleIcon />
        </div>
      </nav>

      <Modal show={showAccountDetails} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => {}}>
            update
          </Button>
        </Modal.Footer>
      </Modal>

      {openMenu == true && (
        <div className="menuContainer">
          <div className="menuContainerLeft">
            <div className="row">
              <Sidebar />
            </div>
          </div>
          <div
            className="menuContainerRight"
            onClick={() => setOpenMenu(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Nav;
