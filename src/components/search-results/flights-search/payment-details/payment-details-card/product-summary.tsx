import React from "react";
import Image from "next/image";
import DetailsTitle from "../../results-details/results-details-card/details-title";
import recommendedProductData from "@/data/flights/search-results/recommended-products-data";

const ProductSummary: React.FC = () => {
  const productTotal = recommendedProductData.reduce(
    (total, product) => total + product.price,
    0,
  );
  const formatPrice = (price: number) => `USD ${price.toFixed(2)}`;
  const roomTotal = 1521.32;
  const totalPrice = productTotal + roomTotal;
  const getDiscountedPrice = (price: number, discount: string) => {
    const discountPercentage = parseFloat(discount.replace("%", ""));
    return price - (price * discountPercentage) / 100;
  };

  return (
    <div className="mt-6 rounded-lg bg-white p-4 ">
      <DetailsTitle text="Product Summary" />
      {recommendedProductData.map((product) => {
        const isDiscount = product.offer.includes("%");
        const discountedPrice = isDiscount
          ? getDiscountedPrice(product.price, product.offer)
          : null;
        return (
          <div key={product.id} className="mb-4 mt-6 items-center md:flex">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.productName}
                height={150}
                width={150}
              />
              <div className="absolute left-0 top-0 p-1">
                <button className="rounded-full bg-white p-1 shadow-xl">
                  <Image
                    width={30}
                    height={30}
                    alt="trash"
                    src="/assets/icons/flights/search-results/search-payment-details/heart.svg"
                  />
                </button>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-700">
                {product.productName}
              </div>
              <div className="mt-2 flex items-center">
                <select className="rounded-md border border-gray-300 p-1">
                  <option>1</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button className="ml-4">
                <Image
                  width={30}
                  height={30}
                  alt="trash"
                  src="/assets/icons/flights/search-results/search-payment-details/trash.svg"
                />
              </button>
              {!isDiscount && (
                <p className="mt-4 text-lg font-bold text-black">
                  {formatPrice(product.price)}
                </p>
              )}
              {isDiscount && (
                <p className="text-lg text-gray-500 line-through">
                  {formatPrice(product.price)}
                </p>
              )}
              {discountedPrice && (
                <p className="text-lg font-bold text-black">
                  {formatPrice(discountedPrice)}
                  <span className="text-md text-gray-600">
                    ({product.offer} off)
                  </span>
                </p>
              )}
              {!isDiscount && (
                <div
                  className={`rounded-full bg-darkBlue px-2 py-1 text-sm font-bold text-white ${product.offer}`}
                >
                  {product.offer}
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className="rounded-lg border-2 bg-gray-100">
        <div className="px-4 py-4">
          <p>
            {" "}
            Currently the delivery is same as room booking. Do you want to
            change the address for products?{" "}
          </p>
          <button className="mt-4 w-full rounded-lg bg-white p-4 shadow-md md:mt-2">
            Change address
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-lg ">
        <p> Product total</p>
        <p>USD {productTotal.toFixed(2)}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-lg">
        <p> Room total </p>
        <p>USD {roomTotal}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-xl font-bold">
        <p> Total price</p>
        <p> {formatPrice(totalPrice)}</p>
      </div>
    </div>
  );
};

export default ProductSummary;
