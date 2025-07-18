// import React from "react";
// import ProductCard from "./productCard"; 
// import { useGetProducts } from "../../../hooks/admin/useProduct/productHooks";

// function MostPopularSection() {
//   const { data: fetchProducts = [], isLoading, isError } = useGetProducts();

//   // We'll show a limited number of products, for example, the first 4 or 8.
//   const popularProducts = fetchProducts.slice(0, 4);

//   return (
//     // 1. Added a light background and significant vertical padding (py-16 or py-24)
//     <section className="w-full bg-slate-50 py-16 sm:py-24">
//       <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* 2. A more stylish, centered header with a descriptive subtitle */}
//         <div className="text-center">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Popular Shoes of the Season
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
//             Discover our best-sellers and find the perfect pair that matches your style.
//           </p>
//         </div>

//         {/* 3. Improved Loading and Error states */}
//         {isLoading ? (
//           <div className="text-center py-16">
//             <p className="text-gray-500">Loading popular products...</p>
//             {/* You could place a spinner component here for a better UX */}
//           </div>
//         ) : isError ? (
//           <div className="text-center py-16">
//             <p className="text-red-600">Failed to fetch products. Please try again later.</p>
//           </div>
//         ) : (
//           // 4. Added more margin-top (mt-16) and a larger gap (gap-8) for the grid
//           <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
//             {popularProducts.map((product) => (
//               <ProductCard 
//                 key={product._id} 
//                 product={{ ...product, hasShopNow: true }} 
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default MostPopularSection;


import React from "react";
import ProductCard from "./productCard"; 
import { useGetProducts } from "../../../hooks/admin/useProduct/productHooks";

function MostPopularSection() {
  const { data: fetchProducts = [], isLoading, isError } = useGetProducts();

  // For a scrolling section, it's better to show more items. Let's use 8.
  const popularProducts = fetchProducts.slice(0, 8);

  return (
    // Changed background to white and adjusted padding to match ManSection
    <section className="w-full bg-white py-20 sm:py-28">

      {/* --- Header Section (Now matches ManSection's left-aligned style) --- */}
      <div className="max-w-7xl px-16 lg:px-16">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Popular Shoes of the Season
          </h2>
        </div>
      </div>

      {/* --- Conditional Rendering for Loading, Error, and Success States --- */}
      {isLoading ? (
        <div className="text-center py-10 px-6">
          <p className="text-gray-500">Loading popular products...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-10 px-6">
          <p className="text-red-600">Failed to fetch products. Please try again later.</p>
        </div>
      ) : (
        // --- Horizontal Scrolling Container (Copied directly from ManSection) ---
        <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pl-6 lg:pl-8">
          {popularProducts.map((product) => (
            // Each card has a fixed width and is told not to shrink
            <div key={product._id} className="flex-none w-72 md:w-80">
              {/* Note: The 'hasShopNow' prop is removed as the standard ProductCard already includes the button */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MostPopularSection;