import React from "react";
import OneInfoProduct from "./OneInfoProduct";
import "./ListLayout.css";

const ListLayout = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((item, index) => (
        <OneInfoProduct key={index} {...item} />
      ))}
    </div>
  );
};

export default ListLayout;
