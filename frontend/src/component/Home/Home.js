import React from 'react';
import CategoryList from '../page/CategoryList.js';
import BannerProduct from '../page/BannerProduct.js';
import HorizontalCardProduct from '../page/HorizontalCardProduct.js';
import VerticalCardProduct from '../page/VerticalCardProduct.js';

function Home() {
  return (
    <div className='bg-slate-100 overflow-hidden'> {/* Prevent horizontal scrolling */}
      <CategoryList />
      <BannerProduct />

      
        <HorizontalCardProduct key="Earbudes" category={"Earbudes"} heading={"Top's Airpods"} />
        <HorizontalCardProduct category={"Bags"} heading={"Popular's Bags"} />
        <HorizontalCardProduct category={"Camera"} heading={"Qualitie's Cameras "} />
      

     
        <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
        <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
  
    </div>
  );
}

export default Home;
