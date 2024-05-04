import React, { useState } from "react";
import "./addProduct.css";
import upload_area from "../../assets/upload_area.svg";
import Swal from "sweetalert2";
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    //console.log(productDetails);

    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4000/uploads", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);

      try {
        const response = await fetch("http://localhost:4000/add-product", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await response.json();

        data.success
          ? await Swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Added!",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            })
          : await Swal.fire({
              icon: "error",
              title: "Error",
              text:
                data.message || "An error occurred while adding the product.",
              confirmButtonText: "OK",
              confirmButtonColor: "#d33",
            });
      } catch (error) {
        console.log("Error adding product:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An error occurred while adding the product.",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33", // Red color for the OK button
        });
      }
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="add-product-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="add-product-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={addProduct} className="add-product-btn">
        Add
      </button>
    </div>
  );
};

export default AddProduct;
