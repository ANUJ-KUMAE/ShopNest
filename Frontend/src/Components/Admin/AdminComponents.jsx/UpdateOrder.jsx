import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminUpdateOrder } from "../../../Actions/OrderAction";
import { RESET_ORDER_UPDATE } from "../../../Constants/OrderConstant";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../../../Styles/AdminSidebar.css";
import { FaCircleCheck } from "react-icons/fa6";

const UpdateOrder = () => {
  const [Status, setStatus] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateLoading, updateStatus, OrderUpdateSuccess } = useSelector(
    (state) => state.orderUpdate
  );

  const { SingleOrderLoading, singleOrderStatus } = useSelector(
    (state) => state.SingleOrderData
  );

  useEffect(() => {
    if (OrderUpdateSuccess) {
      toast.success("Updated Successfully");
      navigate("/");

      dispatch({
        type: RESET_ORDER_UPDATE,
      });
    }
  }, [dispatch, OrderUpdateSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AdminUpdateOrder(id, Status));
  };

  if (updateLoading || SingleOrderLoading) {
    return (
      <div className="page_Loading">
        <AiOutlineLoading3Quarters className="page_loading_icon" />
        <div className="page_Loading_name">Page Loading..... </div>
      </div>
    );
  }

  if (singleOrderStatus.orderStatus === "Delivered") {
    return (
      <div className="Order-Delivered-Message">
        <FaCircleCheck className="fa-check" />
        <p>Order Delivered</p>
      </div>
    );
  }

  return (
    <section>
      <div className="Add-new-Product">
        <div className="Product-Details">
          <div className="Title-Product">
            <h3>Update Order Delivery Status</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="Product-Description">
              <label htmlFor="category_field">Status</label>
              <input
                type="text"
                name="Status"
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="form-button add-product-button admin-button">
              <button type="submit" className="btn">
                Add Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateOrder;
