import React, { useContext, useState, useEffect } from "react";
import "./CSS/shopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery,setSearchQuery] = useState("");


  // Reset currentPage to 1 whenever the category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [props.category]);

  const categorisedProducts = allProducts.filter((item) => item.category === props.category);
  const filteredProducts = categorisedProducts.filter((product)=> product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const itemsPerPage = 12;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  
  const totalPages = Math.ceil(categorisedProducts.length / itemsPerPage);
  
  // Function to sort products based on the selected sort option
  const sortProducts = (products, option) => {
    const sortedProducts = [...products];
    if (option === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.new_price - b.new_price);
    } else if (option === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.new_price - a.new_price);
    } else if (option === "nameAsc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "nameDesc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedProducts;
  };

  // Sort products based on selected option
  const sortedProducts = sortProducts(filteredProducts, sortOption);

  
  


  const handleNext = () => {
  currentPage > totalPages ? setCurrentPage(1) :  setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
  currentPage <= 1 ? setCurrentPage(totalPages) : setCurrentPage(currentPage - 1);
  };
  

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {firstIndex+1} - {Math.min(lastIndex,categorisedProducts.length)}</span> out of {categorisedProducts.length}
          {" "}products
        </p>

        <div className="shopcategory-search">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button type="submit">
      <i className="fa fa-search"></i>
    </button>
  </div>
        <div className="shopcategory-sort">
          <span>Sort by </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts
          .slice(firstIndex,lastIndex)
          .map((item, index) => {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
      </div>
      <div className="shopcategory-pagination">
        <button
          className="shopcategory-previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="shopcategory-next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopCategory;
