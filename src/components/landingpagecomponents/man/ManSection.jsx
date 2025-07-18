import React from 'react';
import { Element } from 'react-scroll';

// NOTE: We no longer need Swiper.js or its CSS for this component.
// You can remove those imports and dependencies if this is the only place you use them.

// --- 1. MOCK DATA (Using a fresh set of guaranteed working shoe images) ---
const mensProductsData = [
  {
    _id: 'prod_man_005',
    name: 'Classic White Court Sneakers',
    price: 4800,
    productImage: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'prod_man_002',
    name: 'Tech-Knit Running Shoes',
    price: 5200,
    productImage: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'prod_man_003',
    name: 'Casual Suede Espadrilles',
    price: 4300,
    productImage: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'prod_man_005',
    name: 'Classic White Court Sneakers',
    price: 4800,
    productImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
  },
  {
    _id: 'prod_man_005',
    name: 'Classic White Court Sneakers',
    price: 5000,
    productImage: 'https://images.pexels.com/photos/9546366/pexels-photo-9546366.jpeg',
  },
  {
    _id: 'prod_man_002',
    name: 'Tech-Knit Running Shoes',
    price: 5200,
    productImage: 'https://images.pexels.com/photos/11924647/pexels-photo-11924647.jpeg',
  }
];


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


function ManSection() {
  return (
    <Element name="man-section">
      <section className="w-full bg-white py-20 sm:py-28">
        
      
  <div className="max-w-7xl px-16 lg:px-16">
  <div className="text-left mb-12">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Explore Our Men's Collection
    </h2>
  </div>
</div>
     
        <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pl-6 lg:pl-8">
          {mensProductsData.map((product) => (
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

export default ManSection;