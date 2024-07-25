import React from 'react'
import Cappuccino from "../../Images/User/Cappuccino.webp";
import "./Card.css";
function Card() {
  return (
   
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="coffee-card-item">
                <div className="row">
                  <div className="col-4">
                    <div
                      className="coffee-card-image"
                      style={{ backgroundImage: `url('${Cappuccino}')` }}
                    ></div>
                  </div>

                  <div
                    className="col-8 text-start"
                    style={{ marginTop: "30px" }}
                  >
                    <div className="coffee-card-item-body"  style={{margin:"1%"}}>
                    <p className="poppins-semibold heading">Cappuccino</p>
                    <p className="plus-jakarta-sans-Regular content">
                      Dark, Rich in flavour espresso lies in wait under a
                      smoothed and stretched layer of thick foam. It's truly the
                      height of our baristas' craft.
                    </p>
                    </div>
                   

                    <div className="d-flex justify-content-between">
                      <p className="poppins-bold price"> $300 </p>

                      <button class="btn blue">Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
   
  )
}

export default Card
