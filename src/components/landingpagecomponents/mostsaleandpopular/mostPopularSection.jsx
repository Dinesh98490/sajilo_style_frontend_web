import React from "react";
// import SectionHeader from "./sectionHeader"; 
import ProductCard from "./productCard"; 
import { useGetProducts } from "../../../hooks/admin/useProduct/productHooks";

function MostPopularSection() {
  const { data: fetchProducts = [], isLoading, isError } = useGetProducts();

  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold text-left mb-4 text-orange-500">
        Popular Shoes of the Season
      </h2>

      {isLoading ? (
        <p className="text-center py-6">Loading...</p>
      ) : isError ? (
        <p className="text-center py-6 text-red-500">Failed to fetch products.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
          {fetchProducts.map((product) => (
            <ProductCard key={product._id} product={{ ...product, hasShopNow: true }} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MostPopularSection;
