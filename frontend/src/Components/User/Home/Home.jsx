import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Home.css'
import Logo from '../../../Images/User/logo.png'
import SearchImg from '../../../Images/User/Search.png'
import CustomizeImg from '../../../Images/User/feedback.png'
import HeartImg from '../../../Images/User/heart.png'
import CommitmentImg from '../../../Images/User/Commitment.png'
import CoffeeImg from '../../../Images/User/CoffeeImg.png'
import SocMeds from '../../../Images/User/socmeds.png'

function Home() {
  return (
    <div className='home' >
      <Navbar></Navbar>
      <div class="container text-start landing-page">
          <p
            class="plus-jakarta-sans-ExtraBold landing-heading"
            style={{ letterSpacing: "-4%"}}
          >
             Discover & Savor <br/> Perfect Brew <br/>Effortlessly
             </p>
          <a href="">
            <p class="plus-jakarta-sans-Regular" style={{fontSize: "16px"}}>
              Immerse yourself in the world of coffee  with our innovative store <br />
               management application! Experience a seamless  journey <br /> beyond the ordinary,
                where you can effortlessly find <br /> and savor your favorite coffee blends. ☕
            </p>
          </a>
          <button class="btn blue">Start now</button>
        </div>

      {/* Features */}

      <div class="features padding" >
        <div class="container">
          <p class="plus-jakarta-sans-ExtraBold blue-heading">FEATURES</p>
          <p class="plus-jakarta-sans-ExtraBold black-heading">
            🤔• What You Can Do?
          </p>

          <div class="row" style={{marginTop: "80px"}}>
            <div class="col-md-4">
              <div class="card-item text-center">
                <div class="img-bg">
                  <img src={SearchImg} alt="" />
                </div>

                <p class="plus-jakarta-sans-Bold heading">Search Coffee</p>
                <p class="plus-jakarta-sans-Medium content">
                  Effortlessly find your next Brew with our powerful and
                  intuitive Coffee search.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card-item text-center">
                <div class="img-bg">
                  <img src={CustomizeImg} alt="" />
                </div>

                <p class="plus-jakarta-sans-Bold heading">Review Coffee</p>
                <p class="plus-jakarta-sans-Medium content">

                  Customize the brew to your need by applying add ons 
                  according to your feel effortlessly
                  
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card-item text-center">
                <div class="img-bg">
                  <img src={HeartImg} alt="" />
                </div>

                <p class="plus-jakarta-sans-Bold heading">Order Coffee</p>
                <p class="plus-jakarta-sans-Medium content">
                  Curate your literary dreams-wishlist books for future
                  adventures and discoveries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Services */}


        <div class="rent-service padding" style={{marginTop: "100px"}}>
        <div class="container">
          <p class="plus-jakarta-sans-ExtraBold blue-heading">SERVICES</p>
          <p class="plus-jakarta-sans-ExtraBold black-heading">
            🚀• The Services for You
          </p>

          <div class="row"style={{marginTop: "60px"}}>
            <div class="col-md-6 col text-center">
              <img src={CommitmentImg} className='service-image2' alt="" />
            </div>

            <div class="col-md-6 col padding">
              <p class="heading">
                <span>Order </span> your favorite coffee quickly on Java Haven!
              </p>

              <p class="plus-jakarta-sans-Medium content">
              Placing and enjoying your favorite coffee has never been easier. An integrated digital store that's simple to use, Java Haven lets you spend less time waiting and more time savoring your brew!
              </p>

              <br />
              <p class="plus-jakarta-sans-Medium content">
              Effortless orders, delightful ambiance—Java Haven transforms your coffee experience, making every visit a pleasure~
              </p>
              <button class="btn blue">Buy now</button>
            </div>
          </div>
          <div class="row"style={{marginTop: "120px"}}>
            <div class="col-md-6 col order-md-1 order-2 padding">
              <p class="heading">
              Quick Coffee Orders: <span>Enjoy</span> Your 
                <span> Brew </span> Instantly
              </p>

              <p class="plus-jakarta-sans-Medium content">
              Ordering and customizing your favorite coffee has never been easier. An integrated digital store that's simple to use, Java Haven lets you spend less time waiting and more time enjoying your perfect cup!
              </p>

              <br />
              <p class="plus-jakarta-sans-Medium content">
              Effortless orders, personalized brews—Java Haven transforms your coffee experience, letting you savor every moment~
              </p>
          <a href="./Books.html"> <button class="btn blue">Buy now</button></a>   
            </div>

            <div class="col-md-6 col order-md-2 order-1 text-center">
              <img src={CoffeeImg} className='service-image2' alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Google maps */}

      <div class="location padding" style={{marginTop: "100px"}}>
        <div class="container">
          <p class="plus-jakarta-sans-ExtraBold blue-heading">LOCATION</p>
          <p class="plus-jakarta-sans-ExtraBold black-heading">
            • Our Cafe Location
          </p>
          <div style={{textAlign: "center"}}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3420222392974!2d80.19851997385567!3d13.01387838730539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d6a2a9f36a1%3A0x30bc5edfd8343076!2sPresidio%20Solutions%20Private%20Limited%20(formerly%20known%20as%20Coda%20Global)%2C%20Chennai!5e0!3m2!1sen!2sin!4v1718899799634!5m2!1sen!2sin"
             
              height="400"
              style={{border: "0"}}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div class="footer-home" style={{marginTop: "80px"}}>
        <div class="d-flex flex-wrap justify-content-around">
          <div class="div1">
            <p class="plus-jakarta-sans-Bold" style={{ fontSize : "24px"}}>
              Managed By
            </p>
            <img
              src={Logo}
              height="40px"
              alt="Logo"
            />
            <span
              class="poppins-semibold"
              style={{marginLeft: "10px", color: "black", fontSize: "26px"}}
            >
              BrewBros
            </span>
          </div>
          <div class="div2">
            <p class="plus-jakarta-sans-Bold" style={{fontSize: "24px"}}>
              Social Media
            </p>
            <img src={SocMeds} alt="" />
          </div>
          <div class="div3">
            <p class="plus-jakarta-sans-Bold"style={{fontSize: "24px"}}>Slogan</p>
            <p class="plus-jakarta-sans-Medium" style={{fontSize: "20px"}}>
              #CoffeeForLife
            </p>
          </div>
        </div>

        <div class="end-bar">
          <p style={{paddingTop: "15px"}}>© 2024 BrewBros. All rights reserved.</p>
        </div>
      </div>

    </div>
  )
}

export default Home
