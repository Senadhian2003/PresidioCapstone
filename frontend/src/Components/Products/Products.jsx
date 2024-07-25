import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Products.css";
import Cappuccino from "../../Images/User/Cappuccino.webp";
import Card from "./Card";
function Products() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="d-flex justify-content-between ">
          <p
            class="plus-jakarta-sans-ExtraBold product-heading"
            style={{ letterSpacing: "-4%" }}
          >
            Espresso
          </p>

          <div class="mb-3 " style={{ marginRight: "10px" }}>
            <input
              id="searchInput"
              type="text"
              class="form-control search"
              placeholder="Search..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>

      <div className="cards">
        <div className="container">
          <div className="row">
            
          <Card></Card>

          <Card></Card>

          <Card></Card>

          <Card></Card>

            




           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
