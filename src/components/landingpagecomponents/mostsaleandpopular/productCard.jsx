// import React from "react";
// import { Card, CardContent } from "../herosection/ui/card";
// import { Button } from "../herosection/ui/button";
// import { Star } from "lucide-react";
// import { Link } from "react-router-dom";

// function ProductCard({ product }) {
//   return (
//     <Card className="group relative overflow-hidden bg-white shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300 max-w-[250px] mx-auto cursor-pointer">
//       <CardContent className="p-3">
//         <div className="aspect-square relative mb-3 bg-gray-100 rounded-lg overflow-hidden">
//           <img
//             src={`http://localhost:5050/${product.image}`}
//             alt={product.title}
//             className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
//           />
//         </div>

//         {/* Info */}
//         <div className="space-y-1">
//           <h3 className="text-xs font-semibold text-gray-900 line-clamp-1">
//             {product.title}
//           </h3>

//           <div className="text-sm font-bold text-gray-900">
//             Rs. {product.price.toLocaleString()}
//           </div>

//           <div className="flex items-center justify-between mt-2">
//             <Button
//               size="xs"
//               className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] px-1.5 w-fit rounded-full transition-colors duration-200"
//             >
//               Add to Cart
//             </Button>

//             <Link
//               to={`/productdetails/${product._id}`}
//               className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
//             >
//               View Details
//             </Link>

//             {product.rating && (
//               <div className="flex items-center gap-1 text-[11px] text-orange-600 select-none">
//                 <Star className="h-4 w-4 fill-orange-400" />
//                 {product.rating}/5
//               </div>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default ProductCard;











import React from "react";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * A modern, professional product card component.
 * It receives product data as a prop and displays it.
 *
 * IMPORTANT: This component is designed to be used within an application that provides
 * a `product` object prop and is wrapped in a React Router (<Router>, <BrowserRouter>, etc.).
 */
function ProductCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added ${product.title} to cart.`);
    // Add your "add to cart" logic here
  };

  // Render a loading state or placeholder if product data is not available.
  // This prevents errors if the data is still loading in the parent component.
  if (!product) {
    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm w-full max-w-sm mx-auto animate-pulse">
            <div className="w-full h-64 bg-gray-200"></div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="mt-auto pt-4 border-t border-gray-100 h-12 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden">
        <Link to={`/productdetails/${product._id}`} className="block">
          <img
            src={`http://localhost:5050/${product.image}`}
            alt={product.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/F3F4F6/333?text=Image+Not+Found'; }}
          />
        </Link>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-800 truncate" title={product.title}>
            {product.title}
          </h3>
          <div className="flex items-center justify-between mt-2 mb-4">
            <p className="text-2xl font-black text-gray-900">
              {`Rs. ${product.price.toLocaleString()}`}
            </p>
            {product.rating && (
              <div className="flex items-center gap-1.5 bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">
                <Star className="h-4 w-4 text-green-600 fill-current" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
          <Link
            to={`/productdetails/${product._id}`}
            className="p-3 bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 hover:bg-gray-300 hover:text-gray-900"
            title="View Details"
          >
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;