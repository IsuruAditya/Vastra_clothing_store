import React, { useContext } from 'react'
import './relatedProducts.css'
import { ShopContext } from "../../Context/ShopContext";
import Item from '../Items/Item'

const RelatedProducts = (props) => {
  const {allProducts} = useContext(ShopContext);
  return (
    <div className='related-products'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {allProducts
          .filter((item)=> item.category === props.product.category)
          .slice(0,4)
          .map((item,index)=>{
              return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts