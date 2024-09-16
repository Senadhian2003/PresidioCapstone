import React from 'react'
import emptyDataImg from '../../../Images/Admin/emptyData.png'
function EmptyAdminActiveOrder() {
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

export default EmptyAdminActiveOrder
