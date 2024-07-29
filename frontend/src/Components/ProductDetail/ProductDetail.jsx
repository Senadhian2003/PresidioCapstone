import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./ProductDetail.css";
import Cappuccino from "../../Images/User/M107777.webp";

function ProductDetail() {
  const [productDetail, setProductDetail] = useState(null);
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [selectedNonDairyAlternative, setSelectedNonDairyAlternative] = useState(null);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [finalPrice, setFinalPrice] = useState();
  const { id } = useParams();
  const [coffeePrice, setCoffeePrice] = useState(0)
  const [capacityPrice, setCapacityPrice] = useState(0)
  const [milkPrice, setMilkPrice] = useState(0)
  const [nonDiaryPrice, setNonDairyPrice] = useState(0)
  const [saucePrice, setSaucePrice] = useState(0)
  const [toppingPrice, setToppingPrice] = useState(0)
  // let nonDiaryPrice = 0
  // let coffeePrice = 0

  useEffect(() => {
    axios
      .get(`http://localhost:5007/api/Coffee/GetCoffeeDetails?coffeeId=${id}`)
      .then((response) => {
        console.log(response.data)
        // coffeePrice = response.data.price
        setCoffeePrice(response.data.price)
        setProductDetail(response.data);
        setSelectedCapacity(response.data.allowedCapacities[0].capacity.capacityName);
        setCapacityPrice(response.data.allowedCapacities[0].capacity.price)
      })
      .catch((error) => console.log(error));
  }, [id]);

  const submitItemToCart = ()=>{

    axios.post('http://localhost:5007/api/Cart/AddCoffeeToCart', {
      "userId": 4,
      "coffeeId": id,
      "addOn": generateAddOnsString,
      "price": finalPrice
    })
    .then(function (response) {
      console.log(response);
      alert("Item added to cart successfully")
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  const toggleSauce = (sauceId, currentSaucePrice) => {
    setSelectedSauces(prev => {
      if (prev.includes(sauceId)) {
        setSaucePrice(saucePrice - currentSaucePrice)
        return prev.filter(id => id !== sauceId);
        
      }
      if (prev.length < productDetail.maxAllowedSauces) {
        setSaucePrice(saucePrice + currentSaucePrice)
        return [...prev, sauceId].sort((a, b) => a - b);
      
      }
      return prev;
    });
  };

  const toggleTopping = (toppingId, currentToppingPrice) => {
    setSelectedToppings(prev => {
      if (prev.includes(toppingId)) {
        setToppingPrice(toppingPrice - currentToppingPrice)
        return prev.filter(id => id !== toppingId);
      }
      if (prev.length < productDetail.maxAllowedToppings) {
        setToppingPrice(toppingPrice + currentToppingPrice)
        return [...prev, toppingId].sort((a, b) => a - b);
      }
      return prev;
    });
  };

  const generateAddOnsString = useMemo(() => {
    if (!productDetail) return "";

    const parts = [];

    if (selectedCapacity) {
      parts.push(`${selectedCapacity}`);
    }

    if (selectedMilk) {
      parts.push(`${selectedMilk}`);
    }

    if (selectedNonDairyAlternative) {
      parts.push(`${selectedNonDairyAlternative}`);
    }

    if (selectedSauces.length > 0) {
      const sauceNames = selectedSauces
        .map(id => productDetail.allowedSauces.find(s => s.sauceId === id).sauce.name)
        .sort()
        .join(',');
      parts.push(`${sauceNames}`);
    }

    if (selectedToppings.length > 0) {
      const toppingNames = selectedToppings
        .map(id => productDetail.allowedToppings.find(t => t.toppingId === id).topping.name)
        .sort()
        .join(',');
      parts.push(`${toppingNames}`);
    }

    setFinalPrice(coffeePrice + capacityPrice + milkPrice + nonDiaryPrice + saucePrice + toppingPrice)

    return parts.join(',');
  }, [productDetail, selectedCapacity, selectedMilk, selectedNonDairyAlternative, selectedSauces, selectedToppings]);

  if (!productDetail) return <div>Loading...</div>;

  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <Navbar />
      <div className="container">
        <div className="product-detail-image" style={{ backgroundImage: `url('${Cappuccino}')` }}></div>
        <div className="d-flex justify-content-between">
        <h1 className="plus-jakarta-sans-ExtraBold product-detail-heading">{productDetail.name}</h1>
        <h1 className="plus-jakarta-sans-ExtraBold product-detail-heading-price">${productDetail.price}</h1>
        </div>
        
        <p className="plus-jakarta-sans-Regular product-detail-content">{productDetail.description}</p>
        
        {/* Size selection */}
        <div>
          <h2 className="plus-jakarta-sans-Bold product-detail-subheading">Size</h2>
          <div className="d-flex">
            {productDetail.allowedCapacities.map((element) => (
              <div key={element.capacityId} style={{ marginRight: "25px" }}>
                <button
                style={{border:"none"}}
                  className={`plus-jakarta-sans-Medium product-detail-size-button ${
                    selectedCapacity === element.capacity.capacityName ? "product-detail-size-price-active" : ""
                  }`}
                  onClick={() =>{ 
                    setSelectedCapacity(element.capacity.capacityName)
                    setCapacityPrice(element.capacity.price)
                  }}
                >
                  {element.capacity.capacityName.slice(0, 1)}
                </button>
                <p className="poppins-medium product-detail-size-price">
                  {element.capacity.capacityName} - <span className="plus-jakarta-sans-Bold">${element.capacity.price}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Milk Types */}
        {productDetail.allowedMilks.length > 0 && (
          <div>
            <h2 className="plus-jakarta-sans-Bold product-detail-subheading">Milk Types</h2>
            <div className="d-flex">
              {productDetail.allowedMilks.map((element) => (
                <div key={element.milkId} style={{ marginRight: "25px" }}>
                  <button
                  style={{border:"none"}}
                    className={`plus-jakarta-sans-Medium product-detail-size-button ${
                      selectedMilk === element.milk.name ? "product-detail-size-price-active" : ""
                    }`}
                    onClick={() =>{ 
                      if(selectedMilk === element.milk.name){
                        setSelectedMilk(null)
                        setMilkPrice(0)
                      }
                      else{
                        setSelectedMilk(element.milk.name)
                        setMilkPrice(element.milk.price)
                      }

                     }}
                  >
                    {element.milk.name}
                  </button>
                  <p className="poppins-medium product-detail-size-price">
                    <span className="plus-jakarta-sans-Bold">${element.milk.price}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Non Dairy Alternatives */}
        {productDetail.allowedCoffeeNonDairyAlternatives.length > 0 && (
          <div>
            <h2 className="plus-jakarta-sans-Bold product-detail-subheading">Non Dairy Alternatives</h2>
            <div className="d-flex">
              {productDetail.allowedCoffeeNonDairyAlternatives.map((element) => (
                <div key={element.nonDairyAlternativeId} style={{ marginRight: "25px" }}>
                  <button
                  style={{border:"none"}}
                    className={`plus-jakarta-sans-Medium product-detail-size-button ${
                      selectedNonDairyAlternative === element.nonDiaryAlternative.name ? "product-detail-size-price-active" : ""
                    }`}
                    onClick={() => {

                      if(selectedNonDairyAlternative === element.nonDiaryAlternative.name){

                        setSelectedNonDairyAlternative(null)
                        setNonDairyPrice(0)
                      }
                      else{
                        setSelectedNonDairyAlternative(element.nonDiaryAlternative.name)
                        setNonDairyPrice(element.nonDiaryAlternative.price)
                      }

                    }}
                  >
                    {element.nonDiaryAlternative.name}
                  </button>
                  <p className="poppins-medium product-detail-size-price">
                    <span className="plus-jakarta-sans-Bold">${element.nonDiaryAlternative.price}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sauces */}
        {productDetail.allowedSauces.length > 0 && (
          <div>
            <div className="d-flex justify-content-between">
              <h2 className="plus-jakarta-sans-Bold product-detail-subheading">Add Ons</h2>
              <p className="poppins-regular" style={{ fontSize: "12px", marginTop: "10px" }}>
                Select any {productDetail.maxAllowedSauces}
              </p>
            </div>
            {productDetail.allowedSauces.map((element) => (
              <div key={element.sauceId} className="d-flex justify-content-between product-detail-sauce">
                <p className="poppins-semibold">
                  {element.sauce.name} <br />+ ${element.sauce.price}
                </p>
                <input
                  type="checkbox"
                  checked={selectedSauces.includes(element.sauceId)}
                  onChange={() => toggleSauce(element.sauceId,element.sauce.price)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Toppings */}
        {productDetail.allowedToppings.length > 0 && (
          <div>
            <div className="d-flex justify-content-between">
              <h2 className="plus-jakarta-sans-Bold product-detail-subheading">Whipped Toppings</h2>
              <p className="poppins-regular" style={{ fontSize: "12px", marginTop: "10px" }}>
                Select any {productDetail.maxAllowedToppings}
              </p>
            </div>
            {productDetail.allowedToppings.map((element) => (
              <div key={element.toppingId} className="d-flex justify-content-between product-detail-sauce">
                <p className="poppins-semibold">
                  {element.topping.name} <br />+ ${element.topping.price}
                </p>
                <input
                  type="checkbox"
                  checked={selectedToppings.includes(element.toppingId)}
                  onChange={() => toggleTopping(element.toppingId, element.topping.price)}
                />
              </div>
            ))}
          </div>
        )}

        <div className="footer">
          <div className="d-flex justify-content-between ">
            <p className="poppins-medium footer-font" style={{ letterSpacing: "-4%" }}>
              {productDetail.name}{" "}
              <small className="plus-jakarta-sans-Regular" style={{ fontSize: "11px" }}>
                {generateAddOnsString}
              </small>
            </p>
            <p className="poppins-medium footer-font" style={{ letterSpacing: "-4%" }}>
              ${finalPrice}
            </p>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn green " onClick={submitItemToCart}>
              <div className="poppins-semibold">Add Item</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;