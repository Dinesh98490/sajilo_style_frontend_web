import React from "react";
import SectionHeader from "./sectionHeader"; 
import { ProductCard } from "./productCard";
import { IMAGE_PATHS } from "../../../common/imageConstant";

const mostPopularProducts = [
  {
    id: 1,
    name: "Sports Shoes",
    price: 5000,
    image: IMAGE_PATHS.landingimage,
    rating: 4.5,
    hasShopNow: true,
  },
  {
    id: 2,
    name: "Black Shoes",
    price: 6000,
    image: IMAGE_PATHS.popular1,
    rating: 4.5,
    hasShopNow: true,
  },
  {
    id: 3,
    name: "Vans",
    price: 6000,
    image: IMAGE_PATHS.popular2,
    rating: 5,
    hasShopNow: true,
  },
  {
    id: 4,
    name: "Yezzy",
    price: 7000,
    image: IMAGE_PATHS.popular3,
    rating: 4,
    hasShopNow: true,
  },
  
];

function MostPopularSection() {
  return (
    <section className="w-full">
      <SectionHeader title="Most Popular" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {mostPopularProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default MostPopularSection;
