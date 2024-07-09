import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppInitializer from "./Components/AppInitializer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <AppInitializer> */}
      <React.StrictMode>
        <App />
        <AppInitializer/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
      </React.StrictMode>
    {/* </AppInitializer> */}
  </Provider>
);
