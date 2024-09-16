import React, { useEffect, useState } from "react";
import Navbar from "../AdminNavbar/AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../Axios/AxiosInstanceAdmin";
import LoadingComponentUser from "../../LoadingAnimation/LoadingComponentUser";
function AddNewCoffee() {

  const [selectedImage, setSelectedImage] = useState(null);

  const [data, setData] = useState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState([]);
  const [allowedSaucesCnt, setAllowedSaucesCnt] = useState("");
  const [allowedToppingsCnt, setAllowedToppingCnt] = useState("");
  const [milk, setmilk] = useState([])
  const [nonDairyAlternative, setNonDairyAlternative] = useState([])
  const [sauce, setSauce] = useState([])
  const [topping, setTopping] = useState([])

  const [validationMessages, setValidationMessages] = useState({
    name: "",
    description: "",
    price: "",
    capacity : "",
    sauceCnt : "",
    toppingCnt : "",
    image: "",
  });


  useEffect(() => {
    axiosInstance
      .get("http://localhost:5007/api/Coffee/GetAllAddOns")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.warn(error.response.data.message)
      } 
      else{
        toast.error("Server error please try again later")
      }
      });
  }, []);


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

  const validateDescription = () => {
    if (!description) {
      setValidationMessages((prevState) => ({
        ...prevState,
        description: "Description cannot be empty"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        description: "Accepted"
      }));
      return true;
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const validatePrice = () => {
    if (!price || isNaN(price) || Number(price) <= 0) {
      setValidationMessages((prevState) => ({
        ...prevState,
        price: "Price must be a positive number"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        price: "Accepted"
      }));
      return true;
    }
  };

  let hanleCapacityClick = (capacityId)=>{
    
    setCapacity((prev)=>{

      if(prev.includes(capacityId)){
        return prev.filter(id => id !== capacityId);
      }
      else{
        return [...prev,capacityId].sort((a, b) => a - b);
      }

    })

  }

  let handleMilkClick = (milkId)=>{
    
    setmilk((prev)=>{

      if(prev.includes(milkId)){
        return prev.filter(id => id !== milkId);
      }
      else{
        return [...prev,milkId].sort((a, b) => a - b);
      }

    })

  }

  let handleNonDiaryAlternative = (nonDairyAlternativeId)=>{
    
    setNonDairyAlternative((prev)=>{

      if(prev.includes(nonDairyAlternativeId)){
        return prev.filter(id => id !== nonDairyAlternativeId);
      }
      else{
        return [...prev,nonDairyAlternativeId].sort((a, b) => a - b);
      }

    })

  }

  let handleSauceClick = (sauceId) =>{

    setSauce((prev)=>{

      if(prev.includes(sauceId)){

        return prev.filter(id=> id!=sauceId);
      }
      else{
        return [...prev,sauceId].sort((a,b)=>a-b)
      }

    })

  }

  let handleToppingClick = (toppingId) =>{

    setTopping((prev)=>{

      if(prev.includes(toppingId)){

        return prev.filter(id=> id!=toppingId);
      }
      else{
        return [...prev,toppingId].sort((a,b)=>a-b)
      }

    })

  }

  let validateCapacity = ()=>{

    if(capacity.length==0){
      setValidationMessages((prev)=>({
        ...prev,
        capacity : "Please select atleast one capacity"
      }))
      return false
    }
    else{

      setValidationMessages((prev)=>({
        ...prev,
        capacity : "Accepted"
      }))
      return true
    }

  }

  const handleSauceCntChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAllowedSaucesCnt(value);
    }
  };

  const handleToppingCntChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAllowedToppingCnt(value);
    }
  };

  let validateSauceCnt = ()=>{

    if(!allowedSaucesCnt){
      setValidationMessages((prev)=>({
        ...prev,
        sauceCnt : "Max allowed topping cannot be empty"
      }))
      return false

    }
    else if(allowedSaucesCnt == 0 && sauce.length>=1){
      setValidationMessages((prev)=>({
        ...prev,
        sauceCnt : "The topping is selected but max count is set to zero"
      }))
      return false
    }
    else if(allowedSaucesCnt > sauce.length){
      setValidationMessages((prev)=>({
        ...prev,
        sauceCnt : "The max allowed Topping is greater than picked Topping"
      }))
      return false
    }
    else{
      setValidationMessages((prev)=>({
        ...prev,
        sauceCnt : "Accepted"
      }))
      return true
    }

  }

  let validateToppingCnt = ()=>{

    if(!allowedToppingsCnt){
      setValidationMessages((prev)=>({
        ...prev,
        toppingCnt : "Max allowed topping cannot be empty"
      }))
      return false

    }
    else if(allowedToppingsCnt == 0 && topping.length>=1){
      setValidationMessages((prev)=>({
        ...prev,
        toppingCnt : "The topping is selected but max count is set to zero"
      }))
      return false
    }
    else if(allowedToppingsCnt > topping.length){
      setValidationMessages((prev)=>({
        ...prev,
        toppingCnt : "The max allowed Topping is greater than picked Topping"
      }))
      return false
    }
    else{
      setValidationMessages((prev)=>({
        ...prev,
        toppingCnt : "Accepted"
      }))
      return true
    }
    
  }

  const validateImage = () => {
    if (selectedImage) {
      setValidationMessages((prevState) => ({
        ...prevState,
        image: "Accepted",
      }));
      return true
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        image: "Please upload an image",
      }));
      return false
    }
  };


  const AddNewCoffee = () => {
    let flag = true;
  
    flag = flag & validateName();
    flag = flag & validateDescription();
    flag = flag & validatePrice();
    flag = flag & validateCapacity();
    flag = flag & validateSauceCnt();
    flag = flag & validateToppingCnt();
    flag = flag & validateImage();
    
   
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('Price', price);
    
    // For arrays, append each item separately
    capacity.forEach(cap => formData.append('AllowedCapacities', cap));
    milk.forEach(m => formData.append('AllowedMilks', m));
    nonDairyAlternative.forEach(nda => formData.append('AllowedNonDairyAlternatives', nda));
    sauce.forEach(s => formData.append('AllowedSauces', s));
    topping.forEach(t => formData.append('AllowedToppings', t));
    formData.append('CoffeeImage', selectedImage);
    formData.append('MaxAllowedSauces', allowedSaucesCnt);
    formData.append('MaxAllowedToppings', allowedToppingsCnt);
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    if (flag) {
      

      axiosInstance.post('http://localhost:5007/api/Coffee/addNewCoffee',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response)=>{
        console.log(response)
        toast.success("New coffee added successfully")
      })
      .catch((error)=>{
        console.log("Error : "+ error)

        if (error.response && error.response.data && error.response.data.message) {
          toast.warn(error.response.data.message)
      } 
      else{
        toast.error("Server error please try again later")
      }

      })

    
      
    } else {
      toast.warn("Please enter correct details");
    }
  };



  if (!data) return (
    <>
    <Navbar/>
    <LoadingComponentUser/>
    </>
  )

  return (
    <div>
      <Navbar />

      <div className="container">
        <div
          class="dashboard-main"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div class="nav-table d-flex justify-content-between align-items-center p-3 poppins-medium">
            <div class="nav-items">
              <a href="Book.html" class="p-2 nav-link active">
                Add new Coffee
              </a>
            </div>
          </div>

          <div class="container-fluid">
            <form class="mt-4">
              <div class="mb-3">
                <label for="CoffeeName" class="form-label">
                  Coffee Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  onBlur={validateName}
                  id="bookTitle"
                  required
                />
                <small id="titleNameHelp" className={validationMessages.name == "Accepted" ? "text-success" : "text-danger"} >{validationMessages.name}</small>
              </div>
              <div class="mb-3">
                <label for="bookDescription" class="form-label">
                  Description
                </label>
                <textarea
                  class="form-control"
                  id="bookDescription"
                  onChange={(e)=>{
                    setDescription(e.target.value)
                  }}
                  onBlur={validateDescription}
                  rows="3"
                  required
                ></textarea>
                <small id="DescriptionNameHelp" className={validationMessages.description == "Accepted" ? "text-success" : "text-danger"} >{validationMessages.description}</small>
              </div>

              <div class="mb-3">
                <label for="bookCategory" class="form-label">
                  Image Upload
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    list="categoryList"
                    type="file"
                    id="bookImg"
                    onChange={(e) => {setSelectedImage(e.target.files[0])
                   
                    }}
                    required
                  />
                </div>
                <small
    id="ImageHelp"
    className={
      validationMessages.image === "Accepted"
        ? "text-success"
        : "text-danger"
    }
  >
    {validationMessages.image}
  </small>
              </div>

              <div class="mb-3">
                <label for="bookCategory" class="form-label">
                  Price
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    list="categoryList"
                    onChange={handlePriceChange}
                    onBlur={validatePrice}
                    value={price}
                    id="categoryName"
                    required
                  />
                </div>
                <small id="CategoryNameHelp" className={validationMessages.price == "Accepted" ? "text-success" : "text-danger"} >{validationMessages.price}</small>
              </div>

              {data.capacities.length > 0 && (
                <div class="mb-3">
                  <label for="bookCategory" class="form-label">
                    Capacity
                  </label>
                  <div class="d-flex">
                    {data.capacities.map((element, index) => {
                      return (
                        <div style={{ marginRight: "25px" }}>
                          <button
                            style={{ border: "none" }}
                            className={`plus-jakarta-sans-Medium product-detail-size-button 
                              ${capacity.includes(element.capacityId)? "product-detail-size-price-active" : ""}
                              `}
                            type="button"
                            onClick={()=>{
                              hanleCapacityClick(element.capacityId)
                            }}
                          >
                            {element.capacityName}
                          </button>
                          <p className="poppins-medium product-detail-size-price">
                            <span className="plus-jakarta-sans-Bold">
                              $ {element.price}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <small id="CategoryNameHelp" className={validationMessages.capacity == "Accepted" ? "text-success" : "text-danger"} >{validationMessages.capacity}</small>
                </div>
              )}

              {data.milks.length > 0 && (
                <div class="mb-3">
                  <label for="bookCategory" class="form-label">
                    Milk Types
                  </label>
                  <div class="d-flex">
                    {data.milks.map((element, index) => {
                      return (
                        <div>
                          <div style={{ marginRight: "25px" }}>
                            <button
                              style={{ border: "none" }}
                              className={`plus-jakarta-sans-Medium product-detail-size-button   ${milk.includes(element.id)? "product-detail-size-price-active" : ""}
                              `}
                              type="button"
                              onClick={()=>{
                                handleMilkClick(element.id)
                              }}
                            >
                              {element.name}
                            </button>
                            <p className="poppins-medium product-detail-size-price">
                              <span className="plus-jakarta-sans-Bold">
                                $ {element.price}
                              </span>
                            </p>
                          </div>
                          <small id="CategoryNameHelp"></small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {data.nonDairyAlternatives.length > 0 && (
                <div class="mb-3">
                  <label for="bookCategory" class="form-label">
                    Non Dairy Alternatives
                  </label>
                  <div class="d-flex">
                    {data.nonDairyAlternatives.map((element, index) => {
                      return (
                        <div>
                          <div style={{ marginRight: "25px" }}>
                            <button
                              style={{ border: "none" }}
                              className={`plus-jakarta-sans-Medium product-detail-size-button ${nonDairyAlternative.includes(element.id)? "product-detail-size-price-active" : ""}`}
                              type="button"
                              onClick={()=>{
                                handleNonDiaryAlternative(element.id)
                              }}
                            >
                              {element.name}
                            </button>
                            <p className="poppins-medium product-detail-size-price">
                              <span className="plus-jakarta-sans-Bold">
                                $ {element.price}
                              </span>
                            </p>
                          </div>
                          <small id="CategoryNameHelp"></small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {data.sauces.length>0 && (
                <div class="mb-3">
                <div class="">
                  <div style={{ marginRight: "25px" }}>
                    <h2 className="plus-jakarta-sans-Bold product-detail-subheading">
                      Add Ons
                    </h2>
                    <small id="CategoryNameHelp" className={validationMessages.sauceCnt!="Accepted"? "text-danger" : "text-success" } >{validationMessages.sauceCnt}</small>
                    <div className="d-flex  ">
                      <p
                        className="poppins-regular"
                        style={{ fontSize: "12px", marginTop: "10px" }}
                      >
                        Select any
                      </p>
                      <input
                        class="form-control"
                        list="categoryList"
                        onChange={handleSauceCntChange}
                        value={allowedSaucesCnt}
                        style={{
                          width: "100px",
                          height: "30px",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                        id="categoryName"
                        required
                      />

                    </div>
                   
                    <div>
                      
                      {

                        data.sauces.map((element, index)=>{
                          return <div className="d-flex justify-content-between product-detail-sauce">
                          <p className="poppins-semibold">
                           {element.name} <br />+ ${element.price}
                          </p>
                          <input type="checkbox" checked={sauce.includes(element.id)}  onClick={()=>handleSauceClick(element.id)} />
                        </div>
                        })

                      }

                    </div>
                  </div>
                </div>
                <small id="CategoryNameHelp"></small>
              </div>
              )}

              {

                data.toppings.length>0 && (
                  <div class="mb-3">
                <div class="">
                  <div style={{ marginRight: "25px" }}>
                    <h2 className="plus-jakarta-sans-Bold product-detail-subheading">
                      Toppings
                    </h2>
                    <small id="CategoryNameHelp" className={validationMessages.toppingCnt=="Accepted"? "text-success" : "text-danger" } >{validationMessages.toppingCnt}</small>
                  
                    <div className="d-flex  ">
                      <p
                        className="poppins-regular"
                        style={{ fontSize: "12px", marginTop: "10px" }}
                      >
                        Select any
                      </p>
                      <input
                        class="form-control"
                        list="categoryList"
                        onChange={handleToppingCntChange}
                        value={allowedToppingsCnt}
                        style={{
                          width: "100px",
                          height: "30px",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                        onblur="validateCategory()"
                        id="categoryName"
                        required
                      />
                    </div>
                    <div>
                      {
                        data.toppings.map((element,index)=>{
                          return <div className="d-flex justify-content-between product-detail-sauce">
                          <p className="poppins-semibold">
                            {element.name} <br />+ ${element.price}
                          </p>
                          <input type="checkbox" checked={topping.includes(element.id)}  onClick={()=>handleToppingClick(element.id)} />
                        </div>
                        })
                      }
                    </div>
                  </div>
                </div>
                <small id="CategoryNameHelp"></small>
              </div>
                )

              }

              <button type="button" id="addBookBtn" class="btn blue" onClick={AddNewCoffee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewCoffee;
