import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Navbar from "./Navbar/Navbar";
import Cart from "./Cart/Cart";
import Footer from "./Footer/Footer";
import SingleProductData from "./Container/SingleProductData";

import Profile from "./Components/Profile";
import PrivateComponents from "./Components/PrivateComponents";
import Products from "./Components/Products";
import ProfileUpdate from "./Components/ProfileUpdate";
import BuyProduct from "./Components/BuyProduct";
import Users from "./Components/Admin/AdminComponents.jsx/Users";
import AdminProducts from "./Components/Admin/AdminComponents.jsx/AdminProducts";
import AddNewProducts from "./Components/Admin/AdminComponents.jsx/AddNewProducts";
import Orders from "./Components/Admin/AdminComponents.jsx/Orders";
import AdminSidebar from "./Components/Admin/AdminComponents.jsx/AdminSidebar";
import Cloths from "./ProductPages/Cloths";
import Shoes from "./ProductPages/Shoes";
import Assasories from "./ProductPages/Assasories";
import Bags from "./ProductPages/Bags";
import BeautyHealth from "./ProductPages/BeautyHealth";
import Books from "./ProductPages/Books";
import Camers from "./ProductPages/Camers";
import Decore from "./ProductPages/Decore";
import Electronics from "./ProductPages/Electronics";
import Headphone from "./ProductPages/Headphone";
import Laptops from "./ProductPages/Laptops";
import Luggauge from "./ProductPages/Luggague";
import Sports from "./ProductPages/Sports";
import UpdateUserDetails from "./Components/Admin/AdminComponents.jsx/UpdateUserDetails";
import UpdateProductDetails from "./Components/Admin/AdminComponents.jsx/UpdateProductDetails";
import OrderDetail from "./Components/Admin/AdminComponents.jsx/OrderDetail";
import UpdateOrder from "./Components/Admin/AdminComponents.jsx/UpdateOrder";
import Shipping from "./Cart/Shipping";
import axios from "axios";
import Payment from "./Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmOrder from "./Order/ConfirmOrder";
import SearchPage from "./Navbar/SearchPage";
import ErrorPage from "./Components/ErrorPage";
import UserOrders from "./Order/UserOrders";
import UserSingleOrder from "./Order/UserSingleOrder";
import Help from "./Services/Help";
import CustomerSupport from "./Services/CustomerSupport";
import Watch from "./ProductPages/Watch";
import Mobile from "./ProductPages/Mobile";
import Tablets from "./ProductPages/Tablets";
import Instruments from "./ProductPages/Instruments";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        Authorization: AuthorizationToken,
      },
    };

    async function getStripeApiKey() {
      const { data } = await axios.get(
        "https://shop-nest-api.vercel.app/Api/Stripe/payment/info",
        configData
      );
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/singleProduct/:id" element={<SingleProductData />} />
          <Route path="/loginSignup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/cloth" element={<Cloths />} />
          <Route path="/product/shoes" element={<Shoes />} />
          <Route path="/product/bag" element={<Bags />} />
          <Route path="/product/assasories" element={<Assasories />} />
          <Route path="/product/bhealth" element={<BeautyHealth />} />
          <Route path="/product/book" element={<Books />} />
          <Route path="/product/camera" element={<Camers />} />
          <Route path="/product/decore" element={<Decore />} />
          <Route path="/product/electronic" element={<Electronics />} />
          <Route path="/product/instruments" element={<Instruments />} />
          <Route path="/product/sport" element={<Sports />} />
          <Route path="/product/headphone" element={<Headphone />} />
          <Route path="/product/laptop" element={<Laptops />} />
          <Route path="/product/luggague" element={<Luggauge />} />
          <Route path="/product/Watch" element={<Watch />} />
          <Route path="/product/Mobile" element={<Mobile />} />
          <Route path="/product/Tablet" element={<Tablets />} />
          <Route path="/search/products" element={<SearchPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/customerSupport" element={<CustomerSupport />} />
          <Route path="*" element={<ErrorPage />} />

          <Route element={<PrivateComponents />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateProfile/:id" element={<ProfileUpdate />} />
            <Route path="/confirmOrder" element={<ConfirmOrder />} />
            <Route path="/shippingInfo" element={<Shipping />} />
            <Route path="/userOrder" element={<UserOrders />} />
            <Route path="/getSingleOrder/:id" element={<UserSingleOrder />} />

            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}

            <Route path="/admin" element={<AdminSidebar />}>
              <Route path="users" element={<Users />} />
              <Route path="adminProducts" element={<AdminProducts />} />
              <Route path="addNewProduct" element={<AddNewProducts />} />
              <Route path="orders" element={<Orders />} />
              <Route
                path="updateRegistredUser/:id"
                element={<UpdateUserDetails />}
              />
              <Route
                path="UpdateAdminProducts/:id"
                element={<UpdateProductDetails />}
              />
              <Route path="OrderDetails/:id" element={<OrderDetail />} />
              <Route path="updateOrderDetails/:id" element={<UpdateOrder />} />
            </Route>
            <Route path="/buy" element={<BuyProduct />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
