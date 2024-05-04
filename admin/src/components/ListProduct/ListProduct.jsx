import React, { useEffect, useState } from "react";
import "./listProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import Swal from "sweetalert2";
const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/all-products")
      .then((res) => res.json())
      .then((data) => setAllproducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You want to remove this product!",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33", // Red color for the OK button
        cancelButtonColor: "#3085d6", // Green color for the Cancel button
      });

      result.isConfirmed &&
        (await fetch(`http://localhost:4000/remove-product`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }));
    } catch (error) {
      console.log(error);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6", // Green color for the OK button
      });
    } finally {
      await fetchInfo();
    }
  };

  return (
    <div className="list-product">
      <h1>All Pronounce List</h1>
      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-all-products">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div key={index} className="list-product-format-main">
                <img
                  src={product.image}
                  alt=""
                  className="list-product-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>{product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => removeProduct(product.id)}
                  src={cross_icon}
                  alt=""
                  className="list-product-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
