import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import CartCard from "./CartCard";
import "./Cart.css";
import axiosInstance from "../../Axios/AxiosInstance";
import { toast } from "react-toastify";
import LoadingComponentUser from "../../LoadingAnimation/LoadingComponentUser";
import EmptyCartComponent from "./EmptyCartComponent";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [userId, setUserId] = useState(19);
  const navigate = useNavigate();


  
  useEffect(()=>{

   getCartItems()

  },[])

  let getCartItems = ()=>{
    axiosInstance.get(`http://localhost:5007/api/Cart/GetCartItems`)
    .then((response)=>{
      setIsLoading(false)
      console.log(response.data)
      setData(response.data)
      let newTotal = 0;
      let newDiscount = 0;
      response.data.forEach((item) => {
        newTotal += item.cartItemPrice;
        newDiscount += item.discount;
      });
      setTotal(newTotal);
      setDiscount(newDiscount);
    })
    .catch(function (error) {
      setIsLoading(false)
      setIsError(true)
      console.log(error);
     

      
      if (error.response && error.response.data && error.response.data.message) {
        toast.warn(error.response.data.message)
      } 
      else{
        toast.error("Server error please try again later")
      }

    });

  }


  let checkout = ()=>{

    // console.log("CLICKED")

    axiosInstance.post(`http://localhost:5007/api/Cart/CheckoutCart`)
    .then((response)=>{
      console.log(response.data)
      alert("Order placed successfully")
      navigate('/activeOrderHistory')
    })
    .catch(function (error) {
      // console.log(error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.warn(error.response.data.message)
      } 
      else{
        toast.error("Server error please try again later")
      }

    });


  }

  if(isLoading)
    return (
      <>
      <Navbar/>
      <LoadingComponentUser/>
      </>
    )
  else if(isError)
  return(
    <div >
      <Navbar/>
     <EmptyCartComponent/>
    </div>
  )

  if(data)
  return (
    <div className="cart">
      <Navbar></Navbar>
      <div class="cart-main padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-7 col-md-12">
              <div class="cart-items" id="cart-items">

              {
                data.map((element, index)=>{
                
                  return <CartCard data={element} getCartItems={getCartItems} />

                })
              }

              
              </div>
            </div>

            <div class="col-lg-5 col-md-12">
              <div class="checkout-container" id="checkout-container">
                <div class="checkout-card">
                  <p class="heading">Order Summary</p>

                  <div class="d-flex justify-content-between">
                    <p class="left-text">Subtotal</p>
                    <p class="right-text" id="sub-total">
                      ${total}
                    </p>
                  </div>

                  <div class="d-flex justify-content-between">
                    <p class="left-text">Discount</p>
                    <p class="right-text" id="discount">
                      ${discount}
                    </p>
                  </div>

                  

                  <hr />
                  <div class="d-flex justify-content-between">
                    <p class="left-text">Total</p>
                    <p class="right-text" id="final-total">
                      ${total - discount}
                    </p>
                  </div>

                  <button
                    class="btn blue"
                    onClick={checkout}
                    id="checkout-btn"
                    style={{ width: "100%" }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
