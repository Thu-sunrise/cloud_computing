import React from "react";
import "./OneInfoProduct.css";

const OneInfoProduct = ({ image, title, label, points, discount, oldPoints }) => {
  const hasDiscount = !!discount && oldPoints;

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />

      <div className="product-info">
        <h3 className="product-title">{title}</h3>

        <div className="product-labels">
          {label?.split(",").map((lb, i) => (
            <span key={i} className="product-label">
              {lb.trim()}
            </span>
          ))}
        </div>

        <div className="product-price">
          <span className="current-points">{points} points</span>
          {hasDiscount && <span className="old-points">{oldPoints} points</span>}
        </div>

        {hasDiscount && <span className="discount-tag">{discount}% off</span>}
      </div>
    </div>
  );
};

export default OneInfoProduct;
