"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DetailsTitle from "./results-details-card/details-title";
import recommendedProductData from "@/data/flights/search-results/recommended-products-data";
import Image from "next/image";
import AddCartButton from "./results-details-card/add-cart-button";

const RecommendedProductDetailsSlider = ({
  deviceType,
}: {
  deviceType: string;
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const getOfferClass = (offer: string) => {
    return offer.toLowerCase().includes("free delivery")
      ? "bg-darkBlue text-black rounded-full  w-fit text-md"
      : "bg-yellow-200 text-yellow-800";
  };

  const formatPrice = (price: number) => `USD ${price.toFixed(2)}`;

  const getDiscountedPrice = (price: number, discount: string) => {
    const discountPercentage = parseFloat(discount.replace("%", ""));
    return price - (price * discountPercentage) / 100;
  };
  return (
    <div className="mt-6 rounded-lg border p-6">
      <DetailsTitle text={"Here is some Recommended products"} />

      <Carousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        // itemClass="carousel-item"
      >
        {recommendedProductData.map((product) => {
          const isDiscount = product.offer.includes("%");
          const discountedPrice = isDiscount
            ? getDiscountedPrice(product.price, product.offer)
            : null;

          return (
            <div className="carousel-item mx-4 h-max" key={product.id}>
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
                  <p className="mt-4 text-lg text-gray-500 line-through">
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
      </Carousel>
      <div className="mt-6 flex justify-center">
        <button className="bg-none text-xl font-semibold text-green-700 hover:underline">
          Explore more
        </button>
      </div>
    </div>
  );
};

export default RecommendedProductDetailsSlider;
