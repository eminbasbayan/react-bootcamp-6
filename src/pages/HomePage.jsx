import React from 'react';
import Products from '../components/Products/Products';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Products />
    </div>
  );
};

export default HomePage;
