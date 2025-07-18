import React from 'react';
import { Element } from 'react-scroll';

// --- 1. MOCK DATA (No changes needed here) ---
const womensProductsData = [
  { 
    _id: 'prod_wom_001', 
    name: 'Chic White Heels', 
    price: 9500, 
    productImage: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    _id: 'prod_wom_002', 
    name: 'Fashionable Red Boots', 
    price: 11200, 
    productImage: 'https://images.pexels.com/photos/17018824/pexels-photo-17018824.jpeg' 
  },
  { 
    _id: 'prod_wom_003', 
    name: 'Modern Platform Sneakers', 
    price: 7800, 
    productImage: 'https://images.pexels.com/photos/134064/pexels-photo-134064.jpeg'
  },
  { 
    _id: 'prod_wom_004', 
    name: 'Classic Black Heels', 
    price: 8900, 
    productImage: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  // Added two more products to better demonstrate the scroll
  { 
    _id: 'prod_wom_005', 
    name: 'Elegant Ankle Strap Sandals', 
    price: 7500, 
    productImage: 'https://images.pexels.com/photos/28954916/pexels-photo-28954916.jpeg' 
  },
  { 
    _id: 'prod_wom_006', 
    name: 'Suede Pointed-Toe Flats', 
    price: 6800, 
    productImage: 'https://images.pexels.com/photos/1445696/pexels-photo-1445696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
];

// --- 2. ProductCard Component (This is the same one you provided and needs no changes) ---
function ProductCard({ product }) {
  const { name, price, productImage } = product;
  const formattedPrice = `Rs. ${price.toLocaleString()}`;

  return (
    <a href="#" className="group relative block overflow-hidden rounded-lg">
      <div className="aspect-[3/4] w-full bg-gray-100">
        <img
          src={productImage}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="p-4 absolute inset-x-0 bottom-0">
        <h3 className="text-sm font-medium text-white">{name}</h3>
        <p className="mt-1 text-lg font-semibold text-white">{formattedPrice}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button className="flex items-center gap-2 text-sm font-semibold bg-white text-black py-2.5 px-5 rounded-full transform scale-90 transition-transform duration-300 group-hover:scale-100">
          Shop Now
        </button>
      </div>
    </a>
  );
}

// --- 3. Main WomenSection Component (Re-designed to match ManSection) ---
function WomenSection() {
  return (
    <Element name="women-section">
      {/* Changed bg-slate-50 to bg-white for consistency with ManSection */}
      <section className="w-full bg-white py-20 sm:py-28">
        
        {/* --- Header Section (Same structure as ManSection) --- */}
        <div className="max-w-7xl px-16 lg:px-16">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover Our Women's Collection
            </h2>
          </div>
        </div>
     
        {/* --- Horizontal Scrolling Container (Copied directly from ManSection) --- */}
        <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pl-6 lg:pl-8">
          {womensProductsData.map((product) => (
            // Each card is given a fixed width and is told not to shrink.
            <div key={product._id} className="flex-none w-72 md:w-80">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </section>
    </Element>
  );
}

export default WomenSection;