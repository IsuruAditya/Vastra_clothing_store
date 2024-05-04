import { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);


const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 3000+1; index++) {
    cart[index] = 0;
  }

  return cart;
};



const ShopContextProvider = (props) => {

  const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
  
    useEffect( () => {
      fetch("http://localhost:4000/all-products")
      .then((response)=> response.json())
      .then((data)=> setAllProducts(data))
    }, []);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    console.log(cartItems);
};
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
  };

const getTotalCartAmount = () => {
    let totalAmount =0;
    for(const item in cartItems){
        if(cartItems[item]>0){
          let itemInfo = allProducts.find((product)=>product.id === Number(item));
          totalAmount += itemInfo.new_price *cartItems[item];
        }
        
    }
    return totalAmount;
}


const getTotalCartItems = () => {
 let totalItems =0;
 for(let item in cartItems){
 (cartItems[item]>0) && (totalItems += cartItems[item]);
 }
 return totalItems;
};

  const contextValue = { allProducts,cartItems, addToCart, removeFromCart, getTotalCartAmount,getTotalCartItems };


  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default ShopContextProvider;
