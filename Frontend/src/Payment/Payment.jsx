import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios, { AxiosHeaders } from "axios";
import "./Payment.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CreateUserOrder } from "../Actions/OrderAction";
import { ClearCart } from "../Actions/CartAction";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const stripe = useStripe();
  const element = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user } = useSelector((state) => state.Authentication);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {});

  // const [customer, setCustomer] = useState({
  //   name: user.userName || '',
  //   email: user.email || '',
  //   address: {
  //     line1: shippingInfo.address || '',
  //     city: shippingInfo.city || '',
  //     state: shippingInfo.state || '',
  //     postal_code: shippingInfo.postalcode || '',
  //     country: shippingInfo.country || '',
  //   },
  //   phone: user.phone || ''
  // });

  const orderinfo = JSON.parse(sessionStorage.getItem("OrderInfo"));

  const orderItem = cartItems.map((item) => ({
    product: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  const paymentData = {
    amount: Math.round(orderinfo.GrandTotal * 100),
    shipping: {
      name: user.userName,
      address: {
        line1: shippingInfo.address,
        city: shippingInfo.city,
        postal_code: shippingInfo.postalcode,
      },
    },
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    document.querySelector("#Payment_id").disabled = true;

    let res;
    try {
      const token = localStorage.getItem("token");
      const AuthorizationToken = `Bearer ${token}`;

      const configData = {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      };

      res = await axios.post(
        "http://localhost:8050/Api/Stripe/payment/process",
        paymentData,
        configData
      );

      const clientSecret = res.data.client_secret;

      if (!stripe || !element) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: element.getElement(CardNumberElement),
          billing_details: {
            name: user.userName,
            email: user.email,
            phone: user.phone,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector("#Payment_id").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const orderData = {
            orderItems: orderItem,
            shippingInfo,
            itemPrice: orderinfo.Total,
            taxPrice: orderinfo.GST,
            shippingPrice: orderinfo.ShippingCharge,
            totalPrice: orderinfo.GrandTotal,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
          };

          dispatch(CreateUserOrder(orderData));
          dispatch(ClearCart());

          toast.success("Order Placed");
          navigate("/");
        } else {
          toast.error("There is an issue while processing the payment");
        }
      }
    } catch (error) {
      document.querySelector("#Payment_id").disabled = false;
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <section>
      <div className="Payment-Container">
        <div className="Payment-info">
          <form onSubmit={handlePayment}>
            <h2 className="payment-title">Card Info</h2>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                options={options}
              />
            </div>
            <div className="payment-btn">
              <button type="submit" className="btn" id="Payment_id">
                Pay {`- ${orderinfo && orderinfo.GrandTotal}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;
