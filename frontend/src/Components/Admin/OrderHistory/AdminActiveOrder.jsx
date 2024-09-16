import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../AdminNavbar/AdminNavbar";
import axiosInstance from "../../Axios/AxiosInstanceAdmin";
import { toast } from "react-toastify";
import LoadingComponentUser from "../../LoadingAnimation/LoadingComponentUser";
import EmptyAdminActiveOrder from "./EmptyAdminActiveOrder";
// import "./OrderHistory.css";

function AdminActiveOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState(4);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetchActiveOrders();
  }, []);

  // useEffect(() => {
  //   handleFilter();
  // }, [data]);

  useEffect(() => {
    handleFilter();
  }, [searchInput,data]);

  const handleFilter = () => {
    
    console.log(data)
    const filtered = data.filter((order) => {
      
      return (searchInput==="" || order.user.name.toLowerCase().includes(searchInput.toLowerCase()) || order.orderId.toString().toLowerCase().includes(searchInput.toLowerCase()) );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page
  }
  const fetchActiveOrders = () => {
    axiosInstance
      .get(`http://localhost:5007/api/Order/GetAllActiveOrders`)
      .then((response) => {
        setIsLoading(false)
        console.log(response.data);
        setData(response.data);
        // setFilteredData(response.data)
        handleFilter()
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


  let updateOrderStatus = (orderId, statusId, status)=>{
    console.log("clicked");
    axiosInstance.put('http://localhost:5007/api/Order/UpdateOrderDetails',{
      "orderId": orderId,
  "statusId": statusId,
  "status": status
    })
    .then((response)=>{
      console.log(response);
      fetchActiveOrders()
    })
    .catch((error)=>{
      console.log("Error : " + error);
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
  else if(isError)
  return(
    <div >
      <Navbar/>
     <EmptyAdminActiveOrder/>
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
                    href="/AdminActiveOrder"
                    className="p-2 nav-link active"
                  >
                    Active Orders
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    href="/AdminOrderHistory"
                    className="p-2 nav-link"
                  >
                   Order History
                  </a>
                </div>

                <div className="nav-items d-flex align-items-center">
                  
                  <input
                    type="text"
                    style={{ marginTop: "22px" }}
                    id="searchInput"
                    class="form-control input-text"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e)=> setSearchInput(e.target.value)}
                    aria-describedby="basic-addon1"
                  />
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
                      <td scope="col" className="text-center">Total no of Items</td>
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
                          <td className="text-center">{order.totalItems}</td>
                          <td className="text-center">{order.itemsServed}</td>
                          <td className="text-center">{order.orderStatus}</td>
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
                                      Change Status
                                    </td>
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
                                            <td rowSpan={detail.orderDetailStatuses.length} className="vertical-align-middle">{detail.coffeeName}</td>
                                            <td rowSpan={detail.orderDetailStatuses.length} className="vertical-align-middle">{detail.addOns}</td>
                                            </>

                                          )

                                        }
                                        {/* <td>{detail.coffeeName}</td>
                                        <td>{detail.addOns}</td> */}

<td className="text-center">
                                        {/* <div className="d-flex">
                                        <p class="Pending cursor" onClick={()=>{
                                          updateOrderStatus(order.orderId,status.id, "Pending")
                                        }} >Pending</p>
                                        <p class="Ready cursor" onClick={()=>{
                                          updateOrderStatus(order.orderId,status.id, "Ready")
                                        }}>Ready</p>
                                        <p class="Collected cursor" onClick={()=>{
                                          updateOrderStatus(order.orderId,status.id, "Collected")
                                        }}>Collected</p></div> */}

<select
    class="form-select"
    value={status.status}
    onChange={(e) => {
      const selectedStatus = e.target.value;
      updateOrderStatus(order.orderId, status.id, selectedStatus);
    }}
  >
   
    <option value="Pending" >Pending</option>
    <option value="Ready">Ready</option>
    <option value="Collected">Collected</option>
  </select>

                                        </td>



                                        <td className="text-center ">
                                         <p className={status.status}>{status.status}</p> 
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

export default AdminActiveOrder;
