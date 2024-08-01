import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../AdminNavbar/AdminNavbar";
import logo from "../../../Images/User/logo.png";
import axios from 'axios';
import { toast } from 'react-toastify';

function EmployeeRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Barista");
  const [phone, setPhone] = useState("");
  const [validationMessages, setValidationMessages] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  useEffect(() => {
    setPasswordOfEmployee();
  }, [name, phone]);

  const validateName = () => {
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
  };

  const validateEmail = () => {
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
  };

  const validatePassword = () => {
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
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const validatePhone = () => {
    if (!phone) {
      setValidationMessages((prevState) => ({
        ...prevState,
        phone: "Phone number field cannot be empty"
      }));
      return false;
    } else if (phone.length !== 10) {
      setValidationMessages((prevState) => ({
        ...prevState,
        phone: "Phone number length must be exactly 10"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        phone: "Accepted"
      }));
      return true;
    }
  };

  const setPasswordOfEmployee = () => {
    if (name && phone) {
      setPassword(name.slice(0, 2) + phone.slice(0, 3));
    } else if (name) {
      setPassword(name.slice(0, 2));
    } else {
      setPassword(phone.slice(0, 3));
    }
  };

  const registerUser = () => {
    let flag = true;
    flag = flag & validateEmail();
    flag = flag & validatePassword();

    if (flag) {
      axios.post('http://localhost:5007/api/Authentication/RegisterEmployee', {
        name: name,
        email: email,
        phone: phone,
        role: role,
        password: password
      })
        .then((response) => {
          toast.success("Registration successful");
          navigate('/');
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    } else {
      toast.warn("Please enter correct details");
    }
  };

  return (
    <div>
      <Navbar />
      <div className='login-center'>
        <div className="login-container">
          <div className="logo" style={{ textAlign: "center", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
            <p className="poppins-semibold" style={{ marginLeft: "10px", color: "black", fontSize: "26px" }}>
              Add New Employee
            </p>
          </div>
          <form>
            <input type="text" className='login-input' onChange={(e) => setName(e.target.value)} placeholder="Name" id="user-id" onBlur={validateName} pattern="[0-9]*" inputMode="numeric" required />
            <small id="passwordHelp" className={validationMessages.name === "Accepted" ? "text-success" : "text-danger"}>{validationMessages.name}</small>
            <input type="text" className='login-input' onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" id="user-id" onBlur={validateEmail} pattern="[0-9]*" inputMode="numeric" required />
            <small id="passwordHelp" className={validationMessages.email === "Accepted" ? "text-success" : "text-danger"}>{validationMessages.email}</small>
            <input type="password" className='login-input' value={password} placeholder="Password" disabled id="user-password" required />
            <input type="text" className='login-input' value={phone} onChange={handlePhoneChange} placeholder="Mobile number" id="user-id" onBlur={validatePhone} pattern="[0-9]*" inputMode="numeric" required />
            <small id="passwordHelp" className={validationMessages.phone === "Accepted" ? "text-success" : "text-danger"}>{validationMessages.phone}</small>

            <div className="role-selection">
             
              <div className="d-flex ">
              <label style={{margin : "5px"}}>Role:</label>
              <div>
                <input style={{margin : "5px"}} type="radio" id="barista" name="role" value="Barista" checked={role === "Barista"} onChange={() => setRole("Barista")} />
                <label style={{margin : "5px"}} htmlFor="barista">Barista</label>
              </div>
              <div>
                <input style={{margin : "5px"}} type="radio" id="manager" name="role" value="Manager" checked={role === "Manager"} onChange={() => setRole("Manager")} />
                <label style={{margin : "5px"}} htmlFor="manager">Manager</label>
              </div>

              </div>
             

            </div>

            <button type="button" className="login-btn" onClick={registerUser} id="login-btn">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegister;
