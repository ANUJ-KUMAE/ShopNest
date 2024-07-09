import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllUserOrders } from "../../../Actions/OrderAction";
import { useNavigate } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderLoading, AllOrders, error } = useSelector(
    (state) => state.OrdersData
  );

  useEffect(() => {
    dispatch(AllUserOrders());
  }, [dispatch]);

  if (orderLoading) {
    return <div>Loading Order Details....</div>;
  }

  const ViewDetails = (id) => {
    navigate(`/admin/OrderDetails/` + id);
  };

  const updateSingleOrder = (id) => {
    navigate(`/admin/updateOrderDetails/` + id);
  };

  const lstFiveDigit = (str) => {
    if (str.length <= 5) {
      return str;
    }
    return str.slice(-5);
  };

  return (
    <section>
      <div className="user-Container">
        <div className="user-list">
          <div className="title-name-user">
            <h3>
              <BsCartCheckFill
                className="icons"
                style={{ color: "darkgreen" }}
              />
              Users Orders
            </h3>
          </div>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Details</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {AllOrders &&
                  AllOrders.map((curElem, index) => {
                    return (
                      <tr key={index}>
                        <td>{lstFiveDigit(curElem._id)}</td>
                        <td>
                          <button
                            onClick={() => ViewDetails(curElem._id)}
                            className="view-Button"
                          >
                            View
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => updateSingleOrder(curElem._id)}
                            className="update-Button"
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button className="delete-Button">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
