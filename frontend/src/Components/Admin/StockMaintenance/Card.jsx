import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Cappuccino from "../../../Images/User/Cappuccino.webp";
import axios from "axios";
import axiosInstance from "../../Axios/AxiosInstanceAdmin";
import { toast } from "react-toastify";

function Card(props) {
  const [coffeeName, setCoffeeName] = useState(props.data.name);
  const [price, setPrice] = useState(props.data.price);
  const [description, setDescription] = useState(props.data.description);
  const [availability, setAvailability] = useState(props.data.isAvailable);
  const [showModal, setShowModal] = useState(false);

  const [validationMessages, setValidationMessages] = useState({
    coffeeName: "",
    price: "",
    description: "",
    availability: ""
  });

  const validateName = () => {
    if (!coffeeName) {
      setValidationMessages((prevState) => ({
        ...prevState,
        coffeeName: "Coffee Name cannot be empty"
      }));
      return false;
    } else {
      setValidationMessages((prevState) => ({
        ...prevState,
        coffeeName: "Accepted"
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

  const handleAvailabilityChange = () => {
    if(availability==0){
      setAvailability(1)
    }
    else{
      setAvailability(0)
    }
    
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const updateCoffeeData = () => {
    let flag = true;

    flag = flag & validateName();
    flag = flag & validateDescription();
    flag = flag & validatePrice();
    
    if (flag) {
      
      axiosInstance.put('http://localhost:5007/api/Coffee/UpdateCoffeeDetails',{
        "coffeeId": props.data.id,
  "name": coffeeName,
  "description": description,
  "price": price,
  "status": availability
      })
      .then((response)=>{
        console.log(response.data)
        setShowModal(false);
        toast.success("Coffee value updated successfully")
        props.fetchCoffeeData()
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
      alert("Please enter correct details");
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="coffee-card-item">
        <div className="row">
          <div className="col-4">
          <div
                      className="coffee-card-image"
                      style={{ backgroundImage: `url('${props.data.imageURL || Cappuccino}')` }}
                    ></div>
          </div>

          <div className="col-8 text-start" style={{ marginTop: "30px" }}>
            <div className="coffee-card-item-body" style={{ margin: "1%" }}>
              <p className="poppins-semibold heading">{props.data.name}</p>
              <p className="plus-jakarta-sans-Regular content">
                {props.data.description}
              </p>
              {props.data.isAvailable==0 ? <small className="text-danger" >Out Of Stock</small> : <p></p>}
            </div>

            <div className="d-flex justify-content-between">
              <p className="poppins-bold price"> $ {props.data.price} </p>
             
              <button
                className="btn blue"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Coffee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="coffeeName">Coffee Name</Form.Label>
              <Form.Control
                type="text"
                id="coffeeName"
                value={coffeeName}
                onBlur={validateName}
                onChange={(e) => setCoffeeName(e.target.value)}
                required
              />
              <Form.Text className={validationMessages.coffeeName === "Accepted" ? "text-success" : "text-danger"}>
                {validationMessages.coffeeName}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="price">Price</Form.Label>
              <Form.Control
                type="text"
                id="price"
                value={price}
                onBlur={validatePrice}
                onChange={handlePriceChange}
                required
              />
              <Form.Text className={validationMessages.price === "Accepted" ? "text-success" : "text-danger"}>
                {validationMessages.price}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                id="description"
                rows={3}
                value={description}
                onBlur={validateDescription}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Form.Text className={validationMessages.description === "Accepted" ? "text-success" : "text-danger"}>
                {validationMessages.description}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="availability">Availability</Form.Label>
              <Form.Check
                type="switch"
                id="availabilitySwitch"
                checked={availability==1}
                onChange={handleAvailabilityChange}

              />
              <Form.Text className={availability == 1  ? "text-success" : "text-danger"}>
            {availability == 0 ? <p>Out of stock</p>:<p>In stock</p>}
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCoffeeData}>
            Save Coffee
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Card;
