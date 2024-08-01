import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Authentication.css'
import logo from "../../../Images/User/logo.png";
import axios from 'axios';
import { toast } from 'react-toastify';
function Register() {
  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [validationMessages, setValidationMessages] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
    phone : ""
  })

  let validateName = ()=>{
    console.log("Clikced")
    if (!name) {
      setValidationMessages((prevState) => ({
        ...prevState,
        name: "Name cannot be empty"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        name: "Accepted"
      }));
      return true;
    }

  }

  let validateEmail = ()=>{
    console.log("Clikced")
    if (!email) {
      setValidationMessages((prevState) => ({
        ...prevState,
        email: "Email cannot be empty"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        email: "Accepted"
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

  let validateConfirmPassword = ()=>{
    console.log("Clikced")
    if (!confirmPassword) {
      setValidationMessages((prevState) => ({
        ...prevState,
        confirmPassword: "This field cannot be empty"
      }));
      return false;
    }
    else if(password!=confirmPassword){

      setValidationMessages((prevState)=>({
        ...prevState,
        confirmPassword : "Password and confirm password do not match"
      }))

    }
    else {
      setValidationMessages((prevState) => ({
        ...prevState,
        confirmPassword: "Accepted"
      }));
      return true;
    }

  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPhone(value);
    }
  };

  let validatePhone = ()=>{

    if(!phone){

      setValidationMessages((prevState)=>({
        ...prevState,
        phone : "Phone number filed cannot be empty"
      }))
      return false
    }
    else if(phone.length!=10){

      setValidationMessages((prevState)=>({
        ...prevState,
        phone : "Phone number length must be exactly 10"
      }))
      return false
    }
    else{

      setValidationMessages((prevState)=>({
        ...prevState,
        phone : "Accepted"
      }))
      return true

    }


  }

  let registerUser = ()=>{

    let flag = true;

    flag = flag & validateEmail();
    flag = flag & validatePassword()

    if(flag){

      axios.post('http://localhost:5007/api/Authentication/Register',{
        "name": name,
        "email": email,
        "phone": phone,
        "role": "User",
        "password": password
      })
      .then((response)=>{
        console.log(response.data)
        toast.success("Registeration successul")
        navigate('/')
      })
      .catch((error)=>{
        console.log("Error : " + error)
       
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
        <input type="text" className='login-input' onChange={(e)=>setName(e.target.value)} placeholder="Name" id="user-id"  onBlur={validateName} pattern="[0-9]*" inputmode="numeric" required/>
        <small id="passwordHelp" className={validationMessages.name == "Accepted" ? "text-success" : "text-danger"} > {validationMessages.name} </small>
           
            <input type="text" className='login-input' onChange={(e)=>setEmail(e.target.value)} placeholder="Email ID" id="user-id"  onBlur={validateEmail} pattern="[0-9]*" inputmode="numeric" required/>
            <small id="passwordHelp" className={validationMessages.email == "Accepted" ? "text-success" : "text-danger"} > {validationMessages.email} </small>

            <input type="password" className='login-input' onChange={(e)=>setPassword(e.target.value)} placeholder="Password" onBlur={validatePassword} id="user-password" required/>
            <small id="passwordHelp" className={validationMessages.password == "Accepted" ? "text-success" : "text-danger"} > {validationMessages.password} </small>

            <input type="password" className='login-input' onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" id="user-id"  onBlur={validateConfirmPassword} pattern="[0-9]*" inputmode="numeric" required/>
            <small id="passwordHelp" className={validationMessages.confirmPassword == "Accepted" ? "text-success" : "text-danger"} > {validationMessages.confirmPassword} </small>

            <input type="text" className='login-input' value={phone} onChange={handlePhoneChange} placeholder="Mobile number" id="user-id"  onBlur={validatePhone} pattern="[0-9]*" inputmode="numeric" required/>
            <small id="passwordHelp" className={validationMessages.phone == "Accepted" ? "text-success" : "text-danger"} > {validationMessages.phone} </small>

            <button type="button" class="login-btn" onClick={registerUser} id="login-btn">Register</button>
        </form>
        <button onclick="location.href='register.html'" class="register-btn">Login</button>
    </div>
    </div>
  )
}

export default Register
