import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 3000 + 1; index++) {
    cart[index] = 0;
  }

  return cart;
};

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/all-products");
      const data = await response.json();
      setAllProducts(data);
    };

    /* const fetchCart = async () => {
      const response = await fetch("http://localhost:4000/cart",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "content-type": "application/json",
        },
        body:"",
      });
      const data = await response.json();
      setCartItems(data);
    }; */

    const fetchCart = async () => {
      const response = await fetch("http://localhost:4000/cart", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setCartItems(data);
    };

    fetchData();
    (localStorage.getItem("auth-token")) && fetchCart();
  }, []);

  const manageData = async (endponit,itemId) => {
    try {
      const response = await fetch(`http://localhost:4000/${endponit}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  const addToCart = (itemId) => {
   
    if (localStorage.getItem("auth-token")) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      manageData("add-to-cart", itemId);
      Swal.fire({
        title: 'Success',
        text: 'Item added to cart!',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login first to add items to your cart.',
        icon: 'warning',
        showConfirmButton: true,
      });
    }
     
      
     
  };

  const removeFromCart = (itemId) => {
  
    if (localStorage.getItem("auth-token")) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      manageData("remove-from-cart", itemId);
      Swal.fire({
        title: 'Success',
        text: 'Item removed from cart!',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      })
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (let item in cartItems) {
      cartItems[item] > 0 && (totalItems += cartItems[item]);
    }
    return totalItems;
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
