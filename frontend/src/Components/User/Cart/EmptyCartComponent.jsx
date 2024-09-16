import React from "react";
import EmptyCartImage from '../../../Images/User/EmptyCartImage.png'
function EmptyCartComponent() {
  return (
    <div>
      <div class="cart">
        <div class="cart-main padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-7 col-md-12">
                <div class="cart-items" id="cart-items" style={{textAlign:"center"}}>
                  <img
                    src={EmptyCartImage}
                    height="350px"
                    width="300px"
                    alt=""
                  />
                </div>
              </div>

              <div class="col-lg-5 col-md-12">
                <div class="checkout-container" id="checkout-container">
                  <p
                    class="plus-jakarta-sans-ExtraBold"
                    style={{
                    fontSize: "70px",
                    lineHeight: "89px",
                    letterSpacing: "0.01px"
                  }}
                  >
                   Add coffee <br />
to your cart <br />
and savor <br />
each sip
                  </p>

                  <a href="/products">
                    <button class="btn blue"  style={{width: "100%"}}>
                      Browse Coffee
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyCartComponent;
