import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./OrderHistory.css";
import axiosInstance from "../../Axios/AxiosInstance";
import EmptyOrders from "./EmptyOrderHistory";
import LoadingComponentUser from "../../LoadingAnimation/LoadingComponentUser"
import { toast } from "react-toastify";

function OrderHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState(4);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [fromDate, toDate]);

  const fetchOrders = () => {
    axiosInstance
      .get(`http://localhost:5007/api/Order/GetMyOrders`)
      .then((response) => {
        setIsLoading(false)
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with all data
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
        console.log("Error: " + error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.warn(error.response.data.message)
        } 
        else{
          toast.error("Server error please try again later")
        }
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = () => {
    let from = fromDate ? new Date(fromDate) : null;
    let to = toDate ? new Date(toDate) : null;

    if (to) {
      to.setDate(to.getDate() + 1); // Include the 'to' date in the filter
    }

    const filtered = data.filter(order => {
      const orderDate = new Date(order.timeOfOrder);
      return (!from || orderDate >= from) && (!to || orderDate < to);
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          className={`pagination-number ${i === currentPage ? "pagination-active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }

    return pages;
  };

  if(isLoading)
    return (
      <>
      <Navbar/>
      <LoadingComponentUser/>
      </>
    )
  else if(isError)
  return(
    <div >
       <Navbar />
     <EmptyOrders/>
    </div>
  )
  
  if(data)
  return (
    <div>
      <Navbar />

      <div className="main p-4">
        <div className="container">
          <div className="dashboard-header">
            <div className="dashboard-main">
              <div className="nav-table d-flex justify-content-between align-items-center p-3 poppins-medium">
                <div className="nav-items">
                  <a
                    style={{ cursor: "pointer" }}
                    href="/ActiveOrderHistory"
                    className="p-2 nav-link "
                  >
                    Active Orders
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    href="/OrderHistory"
                    className="p-2 nav-link active"
                  >
                   Order History
                  </a>
                </div>
                <div className="nav-items d-flex align-items-center">
                  <div className="date-pickers me-3">
                    <label htmlFor="fromDate" style={{ display: 'inline' }}>
                      {' '}
                      From
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      className="form-control me-2"
                      placeholder="From Date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="date-pickers me-3">
                    <label htmlFor="toDate" style={{ display: 'inline' }}>
                      {' '}
                      To
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      className="form-control me-2"
                      placeholder="To Date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <table
                  id="table-detail"
                  className="table poppins-medium"
                  style={{ fontSize: "14px" }}
                >
                  <thead>
                    <tr>
                      <td scope="col">Order ID</td>
                      <td scope="col">Date Of Order</td>
                      <td scope="col" className="text-center">
                        Ordered Items
                      </td>
                      <td scope="col" className="text-center">
                        Total Price
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((order, index) => (
                      <React.Fragment key={order.orderId}>
                        <tr
                          className="hover-bg"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                        >
                          <td>{order.orderId}</td>
                          <td>{order.timeOfOrder.slice(0,10)}</td>
                          <td className="text-center">{order.totalItems}</td>
                          <td className="text-center">{order.totalPrice}</td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="p-0">
                            <div
                              id={`collapse${index}`}
                              className="collapse"
                              data-bs-parent="#table-detail"
                            >
                              <table
                                className="table poppins-medium Detail mb-0"
                                style={{ fontSize: "14px" }}
                              >
                                <thead>
                                  <tr>
                                    <td scope="col">Coffee Name</td>
                                    <td scope="col">Add Ons</td>
                                    <td scope="col">
                                      Quantity
                                    </td>
                                    <td scope="col">
                                      Price Per Item
                                    </td>
                                    <td className="text-center" scope="col">
                                      Total Price
                                    </td>
                                    <td className="text-center" scope="col">
                                      Discount
                                    </td>
                                    <td className="text-center" scope="col">
                                      Final Price
                                    </td>
                                    
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.orderDetails.map((detail) =>
                                    <tr key={detail.orderDetailId}>

                                      <td>{detail.coffeeName}</td>
                                      <td>{detail.addOns}</td>
                                      <td>{detail.quanitty}</td>
                                      <td className="text-center">{detail.pricePerItem}</td>
                                      <td className="text-center">{detail.price}</td>
                                      <td className="text-center">{detail.discount}</td>
                                      <td className="text-center">{detail.finalAmount}</td>


                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ marginLeft: "5px", textAlign: "start" }}
                      >
                        <div style={{ marginLeft: "40px" }}>
                          {itemsPerPage * (currentPage - 1) + 1}-
                          {Math.min(itemsPerPage * currentPage, filteredData.length)} of{" "}
                          {filteredData.length}
                        </div>
                      </td>
                      <td colSpan="2" style={{ textAlign: "end" }}>
                        <div
                          className="d-flex justify-content-end align-items-center"
                          style={{ marginRight: "40px" }}
                        >
                          <span
                            className={`pagination-arrow ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={() =>
                              currentPage > 1 && handlePageChange(currentPage - 1)
                            }
                          >
                            {"<"}
                          </span>
                          <div className="pagination-container d-flex">
                            {renderPagination()}
                          </div>
                          <span
                            className={`pagination-arrow ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                            onClick={() =>
                              currentPage < totalPages && handlePageChange(currentPage + 1)
                            }
                          >
                            {">"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
