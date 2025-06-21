import React from "react";
import {ProductCard} from "./productCard";
import SectionHeader from "./sectionHeader";
import { IMAGE_PATHS } from "../../../common/imageConstant";

const onSaleProducts = [
  {
    id: 5,
    name: "Ethnic Low Black Natural",
    price: 2000,
    image: IMAGE_PATHS.sale1,
    rating: 5,
    hasShopNow: true,
    discount: "50%",
  },
  {
    id: 6,
    name: "Ethnic Low Black Natural",
    price: 2500,
    image: IMAGE_PATHS.sale2,
    rating: 3,
    hasShopNow: true,
    discount: "30%",
  },
  {
    id: 7,
    name: "Ethnic Low Black Natural",
    price: 4000,
    image: IMAGE_PATHS.sale3,
    rating: 4,
    hasShopNow: true,
    discount: "35%",
  },
  {
    id: 8,
    name: "Ethnic Low Black Natural",
    price: 2800,
    image: IMAGE_PATHS.sale4,
    rating: 4.2,
    hasShopNow: true,
    discount: "30%",
  },
];

function OnSaleSection() {
  return (
    <section className="w-full">
      <SectionHeader title="On sale" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {onSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default OnSaleSection;
