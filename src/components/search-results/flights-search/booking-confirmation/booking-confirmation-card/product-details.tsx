import React from "react";
import Image from "next/image";
import DetailsTitle from "../../results-details/results-details-card/details-title";
import recommendedProductData from "@/data/flights/search-results/recommended-products-data";

const ProductDetails = () => {
  return (
    <div className="mt-12">
      <DetailsTitle text="Product Details" />
      {recommendedProductData.map((product) => {
        return (
          <div
            key={product.id}
            className="mt-6 flex justify-between lg:mx-8 lg:mt-8"
          >
            <div className="flex">
              <div>
                <Image
                  src={product.image}
                  alt={product.productName}
                  height={150}
                  width={150}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">
                  {product.productName}
                </p>

                <div className="mt-4 text-sm text-subHeading">
                  Style: {product.style}
                </div>
                <div className="text-sm text-subHeading">
                  Size: {product.size}
                </div>
                <div className="mt-2 flex items-center">
                  <p>Qty: {product.quantity}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-subHeading">
                ${product.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductDetails;
