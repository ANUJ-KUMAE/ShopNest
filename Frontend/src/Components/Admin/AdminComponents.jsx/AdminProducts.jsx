import React, { useEffect, useState } from "react";
import "../../../Styles/AdminSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductData } from "../../../Actions/ProductDatas";
import { useNavigate } from "react-router-dom";
import {
  DeleteAdminProduct,
  GetAllAdminProduct,
} from "../../../Actions/AdminProductAction";
import { LoadLoginUser } from "../../../Actions/LoginSignupAction";
import { toast } from "react-toastify";
import { RESET_DELETED_PRODUCT } from "../../../Constants/AdminConstants";
import { GrProductHunt } from "react-icons/gr";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { loading, products, productCount } = useSelector(
    (state) => state.products
  );

  const { adminProductLoading, AdminProduct, error } = useSelector(
    (state) => state.admingetProduct
  );

  const { productLoading, deleteProductSuccess } = useSelector(
    (state) => state.ProductDetail
  );

  useEffect(() => {
    dispatch(getAllProductData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetAllAdminProduct(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const totalPagesCount = Math.ceil(productCount / 10);
    setTotalPages(totalPagesCount);
  }, []);

  useEffect(() => {
    if (deleteProductSuccess) {
      toast.success("Product Deleted Successfully");
      navigate("/");

      dispatch({
        type: RESET_DELETED_PRODUCT,
      });
    }
  });

  const AdminSingleProduct = (id) => {
    navigate(`/admin/UpdateAdminProducts/` + id);
  };

  const AdminDeleteProduct = (id) => {
    dispatch(DeleteAdminProduct(id));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="All-Products">
        <div className="Admin-Access-Products">
          <div className="title-name-user">
            <h3>
              {" "}
              <GrProductHunt className="icons" style={{ color: "green" }} /> All
              Products Details
            </h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {AdminProduct &&
                AdminProduct.map((curElement) => {
                  const { _id, images, name } = curElement;
                  return (
                    <tr key={_id} className="Product-items">
                      <td>
                        <img src={images[0].URL} alt={name} />
                      </td>
                      <td>{name}</td>
                      <td>
                        <button onClick={() => AdminSingleProduct(_id)} className="update-Button">
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => AdminDeleteProduct(_id)} className="delete-Button">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>
            <ul className="pagination">
              <li>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Prev
                </button>
              </li>
              {[...Array(totalPages).keys()].map((page) => (
                <li key={page + 1}>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className={currentPage === page + 1 ? "active" : ""}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
