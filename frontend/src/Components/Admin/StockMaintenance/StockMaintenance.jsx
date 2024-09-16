import React from 'react'
import Navbar from "../AdminNavbar/AdminNavbar";
import axios from 'axios';
import Card from "./Card";
import {useState,useEffect} from 'react';
import axiosInstance from "../../Axios/AxiosInstanceAdmin";
import LoadingComponentUser from '../../LoadingAnimation/LoadingComponentUser';
import { toast } from 'react-toastify';
function StockMaintenance() {
  const [query, setQuery] = useState("");
  const [coffees, setCoffees] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(()=>{

   fetchCoffeeData()
  
  },[])

  let fetchCoffeeData = ()=>{
    axios.get('http://localhost:5007/api/Coffee/GetAllCoffees')
    .then( (response)=> {
      // handle success
      setIsLoading(false)
      console.log(response.data);
      setCoffees(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.warn(error.response.data.message)
    } 
    else{
      toast.error("Server error please try again later")
    }

    })
  }

  if(isLoading)
    return (
      <>
      <Navbar/>
      <LoadingComponentUser/>
      </>
    )
  if(coffees!=null)
  return (
    <div>
        <Navbar />

        <div className="container">
        <div className="d-flex justify-content-between ">
          <p
            class="plus-jakarta-sans-ExtraBold product-heading"
            style={{ letterSpacing: "-4%" }}
          >
            Espresso
          </p>
          <div className='d-flex'>
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
          <a href="/addNewCoffee"> <button style={{marginTop:"25px"}}  class="btn blue">+ Add</button></a>
         

          </div>
          
        </div>
      </div>

      <div className="cards">
        <div className="container">
          <div className="row">
            
          {
            coffees.filter((e) => e.name.toLowerCase().includes(query.toLowerCase().trim())).map((element,index)=>{
              return <Card data={element} fetchCoffeeData={fetchCoffeeData} />
            })


          }  
           
          </div>
        </div>
      </div>


    </div>
  )
}

export default StockMaintenance
