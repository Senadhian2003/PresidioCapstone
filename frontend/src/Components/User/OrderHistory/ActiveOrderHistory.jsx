import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./OrderHistory.css";

function ActiveOrderHistory() {
  const [userId, setUserId] = useState(4);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const fetchActiveOrders = () => {
    axios
      .get(`http://localhost:5007/api/Order/GetMyActiveOrders?userId=${userId}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
                    className="p-2 nav-link active"
                  >
                    Active Orders
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    href="/OrderHistory"
                    className="p-2 nav-link"
                  >
                   Order History
                  </a>
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
                      <td scope="col">Total no of Items</td>
                      <td scope="col" className="text-center">
                        Items Received
                      </td>
                      <td scope="col" className="text-center">
                        Status
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
                          <td>{order.totalItems}</td>
                          <td>{order.itemsServed}</td>
                          <td>{order.orderStatus}</td>
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
                                    <td className="text-center" scope="col">
                                      Status
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.orderDetails.map((detail) =>
                                    detail.orderDetailStatuses.map((status, index) => (

                                      

                                      <tr key={status.id}>

                                        {
                                          index==0 && (

                                            <>
                                            <td rowSpan={detail.orderDetailStatuses.length} >{detail.coffeeName}</td>
                                            <td rowSpan={detail.orderDetailStatuses.length} >{detail.addOns}</td>
                                            </>

                                          )

                                        }
                                        {/* <td>{detail.coffeeName}</td>
                                        <td>{detail.addOns}</td> */}
                                        <td className="text-center">
                                          {status.status}
                                        </td>
                                      </tr>
                                    ))
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
                          {Math.min(itemsPerPage * currentPage, data.length)} of{" "}
                          {data.length}
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

export default ActiveOrderHistory;
