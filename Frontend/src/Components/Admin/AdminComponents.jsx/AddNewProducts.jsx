import React, { useEffect, useState } from "react";
import "../../../Styles/AdminSidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddUserNewProduct } from "../../../Actions/AdminProductAction";
import { RESET_NEW_PRODUCT } from "../../../Constants/AdminConstants";
//import { LoadLoginUser } from "../../../Actions/LoginSignupAction";
import { MdFiberNew } from "react-icons/md";

const AddNewProducts = () => {
  const [pname, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState(0);
  const [latest, setLatest] = useState(false);
  const [images, setImages] = useState([]);
  const [imageAvatar, setImageAvatar] = useState([]);

  const dispatch = useDispatch();
  const { newProductLoading, success, error } = useSelector(
    (state) => state.AddUserProduct
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Product Successfully Created");
      navigate("/");
      dispatch({ type: RESET_NEW_PRODUCT });
    }
  }, [dispatch, toast, error, success]);

  const AddNewProductDetails = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", pname);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("discription", description);
    formData.set("company", company);
    formData.set("seller", seller);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(AddUserNewProduct(formData));
  };

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);

    setImageAvatar([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImageAvatar((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const categoryList = [
    "Select One",
    "Mobiles",
    "Tablets",
    "SmartWatches",
    "Laptop",
    "Cameras",
    "Headphone",
    "Books",
    "Bags",
    "Luggage",
    "Cloths",
    "Shoes",
    "Assasories",
    "Home",
    "Beauty/Health",
    "Sports",
    "Instruments",
  ];

  return (
    <section>
      <div className="Add-new-Product">
        <div className="Product-Details">
          <div className="title-name-user">
            <h3><MdFiberNew className="icons" style={{ color: "brown" }} /> Add New Product Details</h3>
          </div>
          <form onSubmit={AddNewProductDetails} encType="multipart/form-data">
            <div className="Product-inputs">
              <label>Name:</label>
              <input
                type="text"
                name="pname"
                value={pname}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter Product Name"
              />
            </div>
            <div className="Product-inputs">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter Product Price"
              />
            </div>
            <div className="Product-inputs">
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter Company Name"
              />
            </div>
            <div className="Product-inputs">
              <label>Seller:</label>
              <input
                type="text"
                name="seller"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter Seller Name"
              />
            </div>
            <div className="Product-inputs">
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter Product Stock"
              />
            </div>
            <div className="Product-Description">
              <label>Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={8}
                cols={20}
                autoComplete="off"
              ></textarea>
            </div>
            <div className="Product-Description">
              <label htmlFor="category_field">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryList.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="Product-inputs">
              <label>Choose Image: </label>
              <input
                type="file"
                id="inputFile"
                name="product_images"
                onChange={onChangeImage}
                multiple
              />
            </div>
            <div className="Product-inputs">
              {imageAvatar.map((img, index) => {
                return (
                  <div className="product-input-image" key={index}>
                    {" "}
                    <img src={img} alt="Images Preview" />
                  </div>
                );
              })}
            </div>
            <div className="Product-inputs-checkbox">
              <label>Latest:</label>
              <input
                id="input-checkbox"
                type="checkbox"
                name="latest"
                checked={latest}
                onChange={(e) => setLatest(e.target.checked)}
              />
            </div>
            <div className="form-button add-product-button">
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNewProducts;
