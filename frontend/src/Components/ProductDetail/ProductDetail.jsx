import React from "react";
import Navbar from "../Navbar/Navbar";
import "./ProductDetail.css";
import Cappuccino from "../../Images/User/M107777.webp";

function ProductDetail() {
  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <Navbar />

      <div className="container ">
        <div
          className="product-detail-image"
          style={{ backgroundImage: `url('${Cappuccino}')` }}
        ></div>

        <div>
          <p
            class="plus-jakarta-sans-ExtraBold product-detail-heading"
            style={{ letterSpacing: "-4%" }}
          >
            Cappuciano
          </p>
          <p className="plus-jakarta-sans-Regular product-detail-content">
            Dark, Rich in flavour espresso lies in wait under a smoothed and
            stretched layer of thick foam. It's truly the height of our
            baristas' craft.
          </p>
        </div>

        <div>
          <p className="plus-jakarta-sans-Bold product-detail-subheading">
            Size
          </p>

          <div className="d-flex">
            <div style={{ marginRight: "25px" }}>
              <button
                style={{ border: "none" }}
                className="plus-jakarta-sans-Medium product-detail-size-button"
              >
                S
              </button>
              <p className="poppins-medium product-detail-size-price">
                180ML- <span className="plus-jakarta-sans-Bold">$0.00</span>
              </p>
            </div>

            <div style={{ marginRight: "25px" }}>
              <button
                style={{ border: "none" }}
                className="plus-jakarta-sans-Medium product-detail-size-button"
              >
                M
              </button>
              <p className="poppins-medium product-detail-size-price">
                350ML- <span className="plus-jakarta-sans-Bold">$63.57</span>
              </p>
            </div>

            <div style={{ marginRight: "25px" }}>
              <button
                style={{ border: "none" }}
                className="plus-jakarta-sans-Medium product-detail-size-button product-detail-size-price-active"
              >
                L
              </button>
              <p className="poppins-medium product-detail-size-price">
                470ML- <span className="plus-jakarta-sans-Bold">$105</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between">
            <p className="plus-jakarta-sans-Bold product-detail-subheading">
              Add Ons
            </p>
            <p className="poppins-regular" style={{ fontSize: "12px", marginTop:"10px" }}>
              Select any 5
            </p>
          </div>

          <div className="">
            <div className="d-flex justify-content-between product-detail-sauce">
              <p className="poppins-semibold">
                White Mocha Sauce <br />+ $3.52
              </p>
              <input
                class="form-check-input"
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
            </div>

            <div className="d-flex justify-content-between product-detail-sauce">
              <p className="poppins-semibold">
                White Mocha Sauce <br />+ $3.52
              </p>
              <input
                class="form-check-input"
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
            </div>

            <div className="d-flex justify-content-between product-detail-sauce">
              <p className="poppins-semibold">
                White Mocha Sauce <br />+ $3.52
              </p>
              <input
                class="form-check-input"
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between">
            <p className="plus-jakarta-sans-Bold product-detail-subheading">
              Whipped Toppings
            </p>
            <p className="poppins-regular" style={{ fontSize: "12px",  marginTop:"10px" }}>
              Select any 1
            </p>
          </div>

          <div className="">
            <div className="d-flex justify-content-between product-detail-sauce">
              <p className="poppins-semibold">
                Whipped Topping <br />+ $3.52
              </p>
              <input
                class="form-check-input"
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
            </div>
          </div>
        </div>

        <div class="footer">
          <div className="d-flex justify-content-between ">
            <p
              class="poppins-medium footer-font"
              style={{ letterSpacing: "-4%" }}
            >
              Cappuciano <small className="plus-jakarta-sans-Regular" style={{fontSize:"11px"}}>Large, White Mocha sauce, Black Mocha sauce, Whipped Topping</small>
            </p>

            <p
              class="poppins-medium footer-font"
              style={{ letterSpacing: "-4%" }}
            >
              $78.34
            </p>
          </div>

         <div className="d-flex justify-content-end">

         <button className="btn green ">
            <div className="poppins-semibold">Add Item</div>{" "}
          </button>

         </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
