import React, { useState, useEffect } from 'react'
import { logIn, verifyToken } from '../../api-calls/apicalls';
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logo-dark.png"
import darkBg from "../../assets/dark_pattern.png"
import "./login.css"

function Login() {
  const [showNotFound, setShowNotFound] = useState(undefined)
  const [password, setPassword] = useState([])
  const [email, setEmail] = useState([])

  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = await logIn({ email: email, password: password })
    // console.log("+++",loginData)
    if (loginData.success == "no") {
      alert(loginData?.message)
    } else if (loginData.success == "yes") {
      // console.log("login successfull")
      // setLoginValidity(true)
      localStorage.setItem("token", loginData.token)
      navigate("/dashboard");
    }
  }

  useEffect(() => {

    console.log("login")

    const verifier = async () => {

      if (localStorage.getItem("token")) {
        const verifiedTokenData = await verifyToken()
        // console.log("rrr",verifiedTokenData?.message)
        if (verifiedTokenData?.message == "jwt expired") {
          // console.log("rrr",verifiedTokenData?.message)
          setShowNotFound(false)
        } else {
          setShowNotFound(true)
        }
      } else {
        setShowNotFound(false)
      }
    }

    verifier()

  }, []);


  if (showNotFound === true) {
    return (<div className='d-flex justify-content-center'>
      you are already logged in, go to&nbsp;<a href="/dashboard">dashboard</a>
    </div>)
  } else if (showNotFound === false) {

    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${darkBg})`, backgroundSize: "cover" }}>
        <div className='admin__login_container'>
          <div className="text-center mt-3">
            <img alt="dark-logo" src={logoDark} className='w-25 h-25' />
          </div>
          <h2 className="text-center mt-3" style={{ color: "white" }}>Admin Login</h2>
          <div className='d-flex flex-column'>
            <div className="mt-3 mb-3 ms-5 me-5">

              <input
                type="email"
                className="form-control form-control-sm"
                placeholder='Enter email'
                id="email"
                name="email"
                value={email}
                autoComplete="off"
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>
            <div className="mt-3 mb-3 ms-5 me-5">

              <input
                type="text"
                className="form-control form-control-sm"
                placeholder='Enter password'
                id="password"
                name="password"
                value={password}
                autoComplete="off"
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>
            <button
              className="btn btn-primary mt-3 mb-5 ms-5 me-5"
              onClick={() => {
                handleLogin()
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login