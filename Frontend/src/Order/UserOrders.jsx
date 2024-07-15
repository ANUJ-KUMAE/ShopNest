import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUserOrder, GetAllOrder } from "../Actions/OrderAction";
import { GiRocketFlight } from "react-icons/gi";
import "./ConfirmOrder.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET_DELETED_PRODUCT } from "../Constants/AdminConstants";

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderLoading, AllOrders, error } = useSelector(
    (state) => state.getorder
  );

  const { deleteOrderSuccess } = useSelector((state) => state.SingleOrderData);

  useEffect(() => {
    dispatch(GetAllOrder());
  }, [dispatch]);

  useEffect(() => {
    if (deleteOrderSuccess) {
      toast.success("Order Deleted");

      navigate("/");

      dispatch({
        type: RESET_DELETED_PRODUCT,
      });
    }
  });

  if (orderLoading) {
    return <div>Loading Order Details....</div>;
  }

  const viewDetail = (id) => {
    navigate(`/getSingleOrder/` + id);
  };

  const deleteOrder = (id) => {
    dispatch(DeleteUserOrder(id));
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
            <h3>Users Orders</h3>
          </div>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {AllOrders &&
                  AllOrders.map((curElem, index) => {
                    return (
                      <tr key={index}>
                        <td className="succeed">{lstFiveDigit(curElem._id)}</td>
                        <td className="succeed">
                          {curElem.paymentInfo.status}
                        </td>
                        <td>
                          <button
                            className="view-Button"
                            onClick={() => viewDetail(curElem._id)}
                          >
                            <GiRocketFlight className="gi-rocket" />
                          </button>
                        </td>
                        <td>
                          <button onClick={() => deleteOrder(curElem._id)} className="delete-Button">
                            Delete
                          </button>
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

export default UserOrders;
