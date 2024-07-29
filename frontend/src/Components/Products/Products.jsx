import React from "react";
import axios from 'axios';
import {useState,useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import "./Products.css";
import Cappuccino from "../../Images/User/Cappuccino.webp";
import Card from "./Card";
function Products() {
  const [query, setQuery] = useState("");
  const [coffees, setCoffees] = useState(null);

  useEffect(()=>{

    axios.get('http://localhost:5007/api/Coffee/GetAllCoffees')
  .then( (response)=> {
    // handle success
    console.log(response.data);
    setCoffees(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
  },[])

  if(coffees!=null){
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
              onChange={(e)=>{setQuery(e.target.value)}} value={query}
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
            
          {
            coffees.filter((e) => e.name.toLowerCase().includes(query.toLowerCase().trim())).map((element,index)=>{
              return <Card data={element} />
            })


          }  
           
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Products;
