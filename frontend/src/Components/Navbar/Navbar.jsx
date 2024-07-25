import React from 'react'
import './Navbar.css'
import Logo from '../../Images/User/logo.png'
function Navbar() {
  return (
    <div>
      
      <nav class="navbar navbar-expand-lg">
          <div class="container">
            <a class="navbar-brand d-flex" style={{marginTop: "8px"}} href="./Home.html">
              <img src={Logo} alt="Logo" />
              <p
                class="poppins-bold"
                style={{marginLeft : '10px', color:"black", fontSize:'26px'}}
              >
                BrewBros
              </p>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse"
              id="navbarNav"
              style={{marginLeft: "70px"}}
            >
              <ul class="navbar-nav" style={{fontSize: "14px", textAlign:'start'}}>
                <li class="nav-item">
                  <a class="nav-link" href="/products">Purchase</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./Cart.html">Cart</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Order History</a>
                </li>
                <li class="nav-item" id="authentication">
                 
                </li>
              </ul>
            </div>
          </div>
        </nav>

    </div>
  )
}

export default Navbar
