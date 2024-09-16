import React from 'react'
import Navbar from "../Navbar/Navbar";
import emptyDataImg from '../../../Images/Admin/emptyData.png'
function EmptyOrderHistory() {
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

export default EmptyOrderHistory
