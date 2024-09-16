import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import logo from "../../../Images/User/logo.png";
import axios from 'axios';
import { toast } from 'react-toastify';
function EmployeeLogin() {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const [validationMessages, setValidationMessages] = useState({
    userEmail : "",
    password : ""
  })

  let validateEmail = ()=>{
    console.log("Clikced")
    if (!email) {
      setValidationMessages((prevState) => ({
        ...prevState,
        userEmail: "Email cannot be empty"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        userEmail: "Accepted"
      }));
      return true;
    }

  }

  let validatePassword = ()=>{
    console.log("Clikced")
    if (!password) {
      setValidationMessages((prevState) => ({
        ...prevState,
        password: "Password cannot be empty"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        password: "Accepted"
      }));
      return true;
    }

  }


  let loginUser = ()=>{

    let flag = true;

    flag = flag & validateEmail();
    flag = flag & validatePassword()

    if(flag){

      axios.post('http://localhost:5007/api/Authentication/EmployeeLogin',{
        "email": email,
        "password": password
      })
      .then((response)=>{
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        toast.success("Login success")
        navigate('/AdminActiveOrder')
      })
      .catch((error)=>{
        console.log("Error : " + error)
        if (error.response && error.response.data && error.response.data.message) {
          toast.warn(error.response.data.message)
        } 
        else{
          toast.error("Server error please try again later")
        }
      })


    }
    else{
      toast.warn("Please enter correct details")
    }


  }


  return (
    <div className='login-center'>
       <div class="login-container">
        <div class="logo" style={{textAlign: "center", width: "100%", marginLeft: "auto", marginRight: "auto"}}>
            <a  class="navbar-brand " style={{marginTop: "8px", textAlign:"center"}} href="/">
                <img src={logo} style={{height: "40px"}} alt="Logo" />
                <p
                  class="poppins-semibold"
                  style={{marginLeft: "10px", color: "black", fontSize: "26px"}}
                >
                  BrewBros
                </p>
              </a>
        </div>
        <form>
           
            <input type="text" className='login-input' onChange={(e)=>setEmail(e.target.value)} placeholder="User ID" id="user-id"  onBlur={validateEmail} pattern="[0-9]*" inputmode="numeric" required/>
            <small id="passwordHelp" className={validationMessages.userEmail == "Accepted" ? "text-success" : "text-danger"} > {validationMessages.userEmail} </small>
            <input type="password" className='login-input' onChange={(e)=>setPassword(e.target.value)} placeholder="Password" onBlur={validatePassword} id="user-password" required/>
            <small id="passwordHelp" className={validationMessages.password == "Accepted" ? "text-success" : "text-danger"} > {validationMessages.password} </small>
            <button type="button" class="login-btn" onClick={loginUser} id="login-btn">Login</button>
        </form>
        <button onclick="location.href='register.html'" class="register-btn">Register</button>
    </div>
    </div>
  )
}

export default EmployeeLogin
