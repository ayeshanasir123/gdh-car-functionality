import React from "react";

interface RecommendedProductData {
  id: number;
  productName: string;
  sellerName: string;
  price: number;
  offer: string;
  quantity?: number;
  size?: string;
  image: string;
  style?: string;
}

const recommendedProductData: RecommendedProductData[] = [
  {
    id: 1,
    productName: "Racing Jacket, Red Ferrari Leather Jacket",
    sellerName: "ETSY Seller",
    price: 250.0,
    offer: "FREE Delivery",
    quantity: 2,
    size: "L",
    style: "popular",
    image:
      "/assets/images/flights/search-results/search-results-details/product-images/brown-jacket.png",
  },
  {
    id: 2,
    productName: "Leather Jacket, Black",
    sellerName: "ETSY Seller",
    price: 300.0,
    quantity: 1,
    size: "L",
    style: "popular",
    offer: "15%",
    image:
      "/assets/images/flights/search-results/search-results-details/product-images/blue-jacket.png",
  },
  {
    id: 3,
    productName: "Racing Jacket Subaru Rally, Black",
    sellerName: "ETSY Seller",
    price: 340.0,
    quantity: 2,
    size: "XL",
    style: "trendy",
    offer: "20%",
    image:
      "/assets/images/flights/search-results/search-results-details/product-images/white-jacket.png",
  },
  {
    id: 4,
    productName: "Vintage Jacket Subaru Rally, Black",
    sellerName: "ETSY Seller",
    price: 320.0,
    quantity: 2,
    size: "L",
    style: "popular",
    offer: "17%",
    image:
      "/assets/images/flights/search-results/search-results-details/product-images/red-jacket.png",
  },
];

export default recommendedProductData;
