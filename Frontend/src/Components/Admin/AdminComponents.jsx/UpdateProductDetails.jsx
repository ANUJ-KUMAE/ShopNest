import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetSingleAdminProduct,
  UpdateAdminSingleProduct,
} from "../../../Actions/AdminProductAction";
import { toast } from "react-toastify";
import { RESET_PRODUCT_UPDATE } from "../../../Constants/AdminConstants";

const UpdateProductDetails = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState("");
  const [latest, setLatest] = useState(false);
  const [imagePrev, setImagePrev] = useState([]);
  const [imageAvatar, setImageAvatar] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productLoading, singleAdminProduct, error, updateProductSuccess } =
    useSelector((state) => state.ProductDetail);

  useEffect(() => {
    if (updateProductSuccess) {
      toast.success("Updated Successfully");

      navigate("/admin/adminProducts");

      dispatch({
        type: RESET_PRODUCT_UPDATE,
      });
    }
  }, [dispatch, updateProductSuccess, navigate]);

  useEffect(() => {
    if (singleAdminProduct) {
      setName(singleAdminProduct.name || "");
      setPrice(singleAdminProduct.price || "");
      setDescription(singleAdminProduct.discription || "");
      setCompany(singleAdminProduct.company || "");
      setSeller(singleAdminProduct.seller || "");
      setStock(singleAdminProduct.stock || "");
      setLatest(singleAdminProduct.latest || false);
      setImagePrev(singleAdminProduct.images?.[0]?.URL || []);
    }
  }, [singleAdminProduct, dispatch, id]);

  useEffect(() => {
    dispatch(GetSingleAdminProduct(id));
  }, [dispatch, id]);

  const UpdateAdminProductDetails = (e) => {
    e.preventDefault();
    const UpdateProductData = {
      name,
      price,
      discription,
      company,
      seller,
      stock,
      latest,
      imageAvatar,
    };

    dispatch(UpdateAdminSingleProduct(id, UpdateProductData));
    //navigate("/admin/adminProducts");
  };

  if (productLoading) {
    return <div>Loading Products.....</div>;
  }

  return (
    <section>
      <div className="Add-new-Product">
        <div className="Product-Details">
          <div className="Title-Product">
            <h3>Admin Product Details</h3>
          </div>
          <form onSubmit={UpdateAdminProductDetails}>
            <div className="Product-inputs">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
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
                name="discription"
                value={discription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={8}
                cols={20}
                autoComplete="off"
              ></textarea>
            </div>
            <div className="Product-inputs">
              <img src={imagePrev} alt="ImagePreview" />
            </div>
            <div className="Product-inputs">
              <label>Choose Image: </label>
              <input
                type="file"
                id="inputFile"
                accept="image/png, image/jpg"
              />
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

export default UpdateProductDetails;
