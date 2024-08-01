import React from "react";
import Navbar from "../AdminNavbar/AdminNavbar";
function AddNewCoffee() {
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
                <label  for="bookTitle" class="form-label">
                  Coffee Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  onblur="validateTitle()"
                  id="bookTitle"
                  required
                />
                <small id="titleNameHelp"></small>
              </div>
              <div class="mb-3">
                <label for="bookDescription" class="form-label">
                  Description
                </label>
                <textarea
                  class="form-control"
                  id="bookDescription"
                  onblur="validateDescription()"
                  rows="3"
                  required
                ></textarea>
                <small id="DescriptionNameHelp"></small>
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
                    required
                  />
                </div>
                <small id="ImageHelp"></small>
              </div>

              <div class="mb-3">
                <label for="bookCategory" class="form-label">
                  Price
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    list="categoryList"
                    onblur="validateCategory()"
                    id="categoryName"
                    required
                  />
                </div>
                <small id="CategoryNameHelp"></small>
              </div>

              <div class="mb-3">
                <label for="bookCategory" class="form-label">
                  Milk Size
                </label>
                <div class="input-group">
                  <div style={{ marginRight: "25px" }}>
                    <button
                      style={{ border: "none" }}
                      className={`plus-jakarta-sans-Medium product-detail-size-button`}
                      type="button"
                    >
                      Small
                    </button>
                    <p className="poppins-medium product-detail-size-price">
                      <span className="plus-jakarta-sans-Bold">$50</span>
                    </p>
                  </div>
                </div>
                <small id="CategoryNameHelp"></small>
              </div>

              <div class="mb-3">
                <label for="bookCategory" class="form-label">
                  Milk Types
                </label>
                <div class="input-group">
                  <div style={{ marginRight: "25px" }}>
                    <button
                      style={{ border: "none" }}
                      className={`plus-jakarta-sans-Medium product-detail-size-button`}
                      type="button"
                    >
                      Regular Milk
                    </button>
                    <p className="poppins-medium product-detail-size-price">
                      <span className="plus-jakarta-sans-Bold">$50</span>
                    </p>
                  </div>
                </div>
                <small id="CategoryNameHelp"></small>
              </div>

              <div class="mb-3">
                <label for="bookCategory" class="form-label">
                  Non Dairy Alternatives
                </label>
                <div class="input-group">
                  <div style={{ marginRight: "25px" }}>
                    <button
                      style={{ border: "none" }}
                      className={`plus-jakarta-sans-Medium product-detail-size-button`}
                      type="button"
                    >
                      Soy
                    </button>
                    <p className="poppins-medium product-detail-size-price">
                      <span className="plus-jakarta-sans-Bold">$50</span>
                    </p>
                  </div>
                </div>
                <small id="CategoryNameHelp"></small>
              </div>

              <div class="mb-3">
                
                <div class="">
                  <div style={{ marginRight: "25px" }}>
                  <h2 className="plus-jakarta-sans-Bold product-detail-subheading">
                        Add Ons
                      </h2>
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
                    style={{width:"100px", height:"30px", marginTop:'5px', marginLeft:"10px"}}
                    onblur="validateCategory()"
                    id="categoryName"
                    required/>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between product-detail-sauce">
                        <p className="poppins-semibold">
                          White mocha <br />+ $50
                        </p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </div>
                </div>
                <small id="CategoryNameHelp"></small>
              </div>


              <div class="mb-3">
                
                <div class="">
                  <div style={{ marginRight: "25px" }}>
                  <h2 className="plus-jakarta-sans-Bold product-detail-subheading">
                        Toppings
                      </h2>
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
                    style={{width:"100px", height:"30px", marginTop:'5px', marginLeft:"10px"}}
                    onblur="validateCategory()"
                    id="categoryName"
                    required/>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between product-detail-sauce">
                        <p className="poppins-semibold">
                          White mocha <br />+ $50
                        </p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </div>
                </div>
                <small id="CategoryNameHelp"></small>
              </div>

              <button type="button" id="addBookBtn" class="btn blue">
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
