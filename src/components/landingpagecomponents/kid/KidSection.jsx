import React from 'react';
import { Element } from 'react-scroll';

// --- 1. MOCK DATA (No changes needed here) ---
const kidsProductsData = [
  { 
    _id: 'prod_kid_001', 
    name: 'Galaxy Explorer Sneakers', 
    price: 4200, 
    productImage: 'https://images.pexels.com/photos/15844905/pexels-photo-15844905.jpeg' 
  },
  { 
    _id: 'prod_kid_002', 
    name: 'Sparkle Princess High-Tops', 
    price: 4500, 
    productImage: 'https://images.pexels.com/photos/267278/pexels-photo-267278.jpeg' 
  },
  { 
    _id: 'prod_kid_003', 
    name: 'Dino Stomper Rain Boots', 
    price: 3800, 
    productImage: 'https://images.pexels.com/photos/15668369/pexels-photo-15668369.jpeg' 
  },
  { 
    _id: 'prod_kid_004', 
    name: 'Sunny Day Sandals', 
    price: 2900, 
    productImage: 'https://images.pexels.com/photos/47220/shoes-pregnancy-child-clothing-47220.jpeg' 
  },
  { 
    _id: 'prod_kid_005', 
    name: 'Cozy Fleece-Lined Slippers', 
    price: 2500, 
    productImage: 'https://images.pexels.com/photos/20406227/pexels-photo-20406227.jpeg' 
  },
  { 
    _id: 'prod_kid_006', 
    name: 'First Walker Leather Shoes', 
    price: 3500, 
    productImage: 'https://images.pexels.com/photos/27128273/pexels-photo-27128273.jpeg' 
  },
];

// --- 2. Standardized ProductCard Component (with hover effects) ---
// This is the same card used in your Man and Women sections for consistency.
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

// --- 3. Main KidsSection Component (Re-designed to match the others) ---
function KidsSection() {
  return (
    <Element name="kids-section">
      <section className="w-full bg-white py-20 sm:py-28">
        
        {/* --- Header Section (Now matches Man/Women sections) --- */}
        <div className="max-w-7xl px-16 lg:px-16">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Kids' Collection
            </h2>
          </div>
        </div>
     
        {/* --- Horizontal Scrolling Container (Now matches Man/Women sections) --- */}
        <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pl-6 lg:pl-8">
          {kidsProductsData.map((product) => (
            <div key={product._id} className="flex-none w-72 md:w-80">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </section>
    </Element>
  );
}

export default KidsSection;