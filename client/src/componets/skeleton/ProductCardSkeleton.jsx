import React from "react";
import "./ProductCardSkeleton.scss";

function ProductCardSkeleton() {
  return (
    <div className="skeleton-card-product">
      <div className="skeleton-card-product--image">
        <div className="skeleton-image skeleton-product-img"></div>
      </div>
      <div className="skeleton-card-product--content">
        <div className="skeleton-text skeleton-product-name"></div>
        <div className="skeleton-price-wrapper">
          <div className="skeleton-text skeleton-product-price"></div>
          <div className="skeleton-text skeleton-product-price"></div>
        </div>
        <div className="skeleton-text skeleton-product-quantity"></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;