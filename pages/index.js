import React from 'react';
import { Products, FooterBanner, HeroBanner } from './components';
import {client} from '../lib/client'

const Home = ({ products, bannerData}) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>
          Best Selling Products
        </h2>
        <p>
          Clothes of many variations
        </p>
      </div>
      <div className='products-container'>
        {products.map((product) => <Products key={product.id} product={product}/>)}
      </div>

     <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData}
  }
}

export default Home;