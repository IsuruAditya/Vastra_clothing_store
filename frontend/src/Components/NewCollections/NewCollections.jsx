import React, { useEffect, useState } from 'react'
import './newCollections.css'
import new_collections from '../Assets/new_collections'
import Item from '../Items/Item'
const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
useEffect(()=>{
  const fetchData = async()=>{
    try{
      const response = await fetch("http://localhost:4000/new-collection");
      const data = await response.json();
      setNewCollection(data);
      
        }catch(error){
          console.log(error);
        }
  }
  fetchData();
},[])

  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
            {
                newCollection.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })
            }
        </div>
    </div>
  )
}

export default NewCollections