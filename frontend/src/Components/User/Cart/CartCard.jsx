import React, {useState, useEffect, useRef } from 'react'
import Cappuccino from "../../../Images/User/Cappuccino.webp";
import ConfirmationModal from './ConfirmationModal';
import CloseImg from "../../../Images/User/close.png";
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from "../../Axios/AxiosInstance";
import { toast } from 'react-toastify';
function CartCard(props) {
    const {data, getCartItems} =props; 
    const [quantity, setQuantity] = useState(data.quantity);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (quantity !== data.quantity) {
            updateCartItemQuantity();
           
        }
    }, [quantity]);

    let updateCartItemQuantity = ()=>{
        console.log("Changed")
        axiosInstance.put('http://localhost:5007/api/Cart/UpdateCartItemQuantity',{
            
                "cartItemId": data.cartItemId,
                "quantity": quantity
            
        }).then((response)=>{
            console.log(response.data)
            toast.success("Item Quanitty updated")
            getCartItems()
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

    let handleDecrease = ()=>{

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    }

    const handleIncrease = () => {
        console.log("clicked")
        setShowModal(true);
      };

      const handleRepeatOrder = () => {
        setQuantity(quantity + 1);
        setShowModal(false);
        // You may want to call an API to update the cart on the server
      };
    
      const handleCustomize = (productId) => {
        setShowModal(false);
        navigate(`/productDetail/${productId}`);
        // Navigate to customize page
        // You might want to use React Router for this
      };


  let deleteCartItem = (cartItemId)=>{
    console.log("Clicked")
    axiosInstance.delete(`http://localhost:5007/api/Cart/DeleteCartItem?cartItemId=${cartItemId}`)
    .then((response)=>{
      console.log(response.data);
      toast.success("Cart item deleted")
      getCartItems()
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
    

  return (
    <div>
        
      <div class="cart-item" data-item-id="">
                  <div class="d-flex justify-content-end">
                    <img
                      class="close-img"
                      onClick={()=>{
                        deleteCartItem(data.cartItemId)
                      }}
                      height="18px"
                      width="18px"
                      src={CloseImg}
                      alt=""
                    />
                  </div>
                  

                  <div class="row">
                    <div
                      class="col-sm-4 col cart-image"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      
                    </div>

                    <div class="col-sm-8 col">
                      <p class="title">{data.coffee.name}</p>
                      <p class="author">
                       {data.addOns}
                      </p>

                      <p class="price">${data.finalAmount} {data.discount!=0 && (
        
        <span className='discount'>Discount - {data.discount}</span>
      ) }</p>

                      <div class="d-flex justify-content-between">
                        <div class="stock-input">
                          <button
                            class="stock-btn minus"
                            data-item-id=""
                            onClick={handleDecrease}
                          >
                            -
                          </button>
                          <input
                            style={{ width: "30px", height: "20px" }}
                            id="quantity"
                            type="number"
                            class="stock-input-field"
                            // onChange={()=>{
                            //     updateCartItemQuantity(data.cartItemId, quantity)
                            // }}

                            value={quantity}
                            min="1"
                            disabled
                          />
                          <button
                            class="stock-btn plus"
                            data-item-id=""
                            onClick={handleIncrease}
                          >
                            +
                          </button>
                        </div>
                        <div><a > <p className="cutomize-text" >Customize</p></a></div>
                        
                      </div>
                    </div>
                  </div>
                </div>

                {showModal && (
        <ConfirmationModal
          coffeeId={data.coffee.id}
          coffeeName={data.coffee.name}
          addOns={data.addOns}
          onRepeatOrder={handleRepeatOrder}
          onCustomize={handleCustomize}
          show={showModal}
          setShowModal = {setShowModal}
        />
      )}
                
    </div>
  )
}

export default CartCard
