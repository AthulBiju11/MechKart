import React, { useState } from 'react';
import Categories from './category.component';
import Products from './products.component';
import Requests from './requests.component';

function Admin() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('categories');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex">
      <div className="w-72 h-screen bg-gray-100 border-r border-gray-300">
        <ul className="list-none p-0">
          <li
            onClick={() => handleMenuItemClick('categories')}
            className={`cursor-pointer py-3 pl-4 ${
              selectedMenuItem === 'categories'
                ? 'border-b-2 border-blue-500 bg-gray-200 font-bold'
                : 'font-normal'
            }`}
          >
            Categories
          </li>
          <li
            onClick={() => handleMenuItemClick('products')}
            className={`cursor-pointer py-3 pl-4 ${
              selectedMenuItem === 'products'
                ? 'border-b-2 border-blue-500 bg-gray-200 font-bold'
                : 'font-normal'
            }`}
          >
            Products
          </li>
          <li
            onClick={() => handleMenuItemClick('requests')}
            className={`cursor-pointer py-3 pl-4 ${
              selectedMenuItem === 'requests'
                ? 'border-b-2 border-blue-500 bg-gray-200 font-bold'
                : 'font-normal'
            }`}
          >
            Requests
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        {selectedMenuItem === 'categories' && <Categories />}
        {selectedMenuItem === 'products' && <Products />}
        {selectedMenuItem === 'requests' && <Requests />}
         
        
      </div >
    </div>
  );
}

export default Admin;
