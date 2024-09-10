import React from "react";
import Image from "next/image";
import DetailsTitle from "./results-details-card/details-title";
import recommendedProductData from "@/data/flights/search-results/recommended-products-data";
import AddCartButton from "./results-details-card/add-cart-button";

const RecommendedProductDetails = () => {
  const getOfferClass = (offer: string) => {
    return offer.toLowerCase().includes("free delivery")
      ? "bg-darkBlue text-black rounded-full mt-0.5 w-fit text-md"
      : "bg-yellow-200 text-yellow-800";
  };

  const formatPrice = (price: number) => `USD ${price.toFixed(2)}`;

  const getDiscountedPrice = (price: number, discount: string) => {
    const discountPercentage = parseFloat(discount.replace("%", ""));
    return price - (price * discountPercentage) / 100;
  };

  return (
    <div className="mt-6 rounded-lg border p-6">
      <DetailsTitle text={"Products Recommended"} />
      {recommendedProductData.map((product) => {
        const isDiscount = product.offer.includes("%");
        const discountedPrice = isDiscount
          ? getDiscountedPrice(product.price, product.offer)
          : null;

        return (
          <div className="mx-4" key={product.id}>
            <div className="mt-6 flex flex-col items-center lg:items-start ">
              <Image
                style={{ width: "300px", height: "300px" }}
                className="rounded-lg"
                src={product.image}
                alt="product image"
                width={300}
                height={300}
              />
              <div className="w-full max-w-xs">
                <p className="truncate text-lg text-gray-600 ">
                  {product.productName}
                </p>
              </div>
              <p className="text-md text-gray-600">
                Ad by {product.sellerName}
              </p>
              {!isDiscount && (
                <p className="mt-4 text-xl font-bold text-black">
                  {formatPrice(product.price)}
                </p>
              )}
              {isDiscount && (
                <p className="text-lg text-gray-500 line-through">
                  {formatPrice(product.price)}
                </p>
              )}
              {discountedPrice && (
                <p className="text-xl font-bold text-black">
                  {formatPrice(discountedPrice)}{" "}
                  <span className="text-md text-gray-600">
                    ({product.offer} off)
                  </span>
                </p>
              )}
              {!isDiscount && (
                <div
                  className={`px-2 py-1 text-sm font-bold text-white ${getOfferClass(product.offer)}`}
                >
                  {product.offer}
                </div>
              )}
              <AddCartButton type="button">Add to Cart</AddCartButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedProductDetails;
