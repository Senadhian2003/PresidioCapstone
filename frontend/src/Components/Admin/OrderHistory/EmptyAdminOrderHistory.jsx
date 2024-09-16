import React from 'react'
import emptyDataImg from '../../../Images/Admin/emptyData.png'
function EmptyAdminOrderHistory() {
  return (
    <div>
      <div className="main p-4">
        <div className="container">
          <div className="dashboard-header">
            <div className="dashboard-main">
              <div className="nav-table d-flex justify-content-between align-items-center p-3 poppins-medium">
                <div className="nav-items">
                  <a
                    style={{ cursor: "pointer" }}
                    href="/AdminActiveOrder"
                    className="p-2 nav-link "
                  >
                    Active Orders
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    href="/AdminOrderHistory"
                    className="p-2 nav-link active"
                  >
                    Order History
                  </a>
                </div>
                <div className="nav-items d-flex align-items-center">
                  <div className="date-pickers me-3">
                    <label htmlFor="fromDate" style={{ display: "inline" }}>
                      {" "}
                      From
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      className="form-control me-2"
                      placeholder="From Date"
                    />
                  </div>
                  <div className="date-pickers me-3">
                    <label htmlFor="toDate" style={{ display: "inline" }}>
                      {" "}
                      To
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      className="form-control me-2"
                      placeholder="To Date"
                    />
                  </div>
                  <input
                    type="text"
                    style={{ marginTop: "22px" }}
                    id="searchInput"
                    class="form-control input-text"
                    placeholder="Search..."
                    aria-label="Search"
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
                  <tr>
        <td colSpan="4" style={{ textAlign: "center" }}>
          <img src={emptyDataImg} alt="" />
        </td>
      </tr>
                  </tbody>
                  <tfoot>
                    
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyAdminOrderHistory
