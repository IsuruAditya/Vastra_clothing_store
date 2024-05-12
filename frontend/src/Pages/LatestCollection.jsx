import React, { useContext, useState} from "react";
import "./CSS/latestCollection.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";
import background3 from "../Components/Assets/background3.jpg";

const LatestCollection = () => {

  const { allProducts } = useContext(ShopContext);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery,setSearchQuery] = useState("");




  const arragedProducts = allProducts.sort((a,b)=> new Date(b.date) - new Date(a.date));
  const filteredProducts = arragedProducts.filter((product)=> product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const itemsPerPage = 12;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  

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
    <div className="latest-collection">
      <div className="banner-container">
        <div className="banner">
        <div className="banner-overlay"></div>
          <div className="banner-text">
            <h1>Latest Collection</h1>
          </div>
        
            </div>
      </div>
      <div className="latest-collection-indexSort">
        <p>
          <span>Showing {firstIndex+1} - {Math.min(lastIndex,filteredProducts.length)}</span> out of {filteredProducts.length}
          {" "}products
        </p>

        <div className="latest-collection-search">
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
        <div className="latest-collection-sort">
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
      <div className="latest-collection-products">
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
      <div className="latest-collection-pagination">
        <button
          className="latest-collection-previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="latest-collection-next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;
