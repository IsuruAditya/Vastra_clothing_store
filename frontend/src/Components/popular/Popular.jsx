import React, { useEffect , useState} from 'react'
import './popular.css'
import Item from '../Items/Item'

const Popular = (props) => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await fetch(`http://localhost:4000/popular-in-${props.category}`);
        const data = await response.json();
        setPopularProducts(data);
        
          }catch(error){
            console.log(error);
          }
    }
    fetchData();
  },[])
  return (
    <div className='popular'>
        <h1>POPULAR IN {props.category}</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular