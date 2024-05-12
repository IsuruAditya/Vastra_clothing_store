import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import Newsletter from "../Components/Newsletter/Newsletter";
import VideoBanner from "../Components/VideoBanner/VideoBanner";
import VideoBanner2 from "../Components/VideoBanner/VideoBanner2";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular category="women" />
      <Offers />
      <Popular category="men" />
      <VideoBanner2/>
      <NewCollections />
      <Newsletter />
      <VideoBanner />
    </div>
  );
};

export default Shop;
