import React from "react";
import "./ProductInforSkeleton.scss";

function ProductInforSkeleton() {
  return (
    <div className="productInfor">
      <div className="content">
        <div className="productInfor--box">
          <div className="productInfor--box--left">
            <div className="skeleton-image skeleton-main"></div>
            <div className="productInfor--box--left--listImg">
              {[1, 2, 3].map((item) => (
                <div key={item} className="productInfor--box--left--listImg--card">
                  <div className="skeleton-image skeleton-small"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="productInfor--box--right">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-price-group">
              <div className="skeleton-text skeleton-price"></div>
              <div className="skeleton-text skeleton-price"></div>
            </div>
            <div className="skeleton-rating"></div>
            <div className="skeleton-color-group">
              <div className="skeleton-text skeleton-label"></div>
              <div className="skeleton-colors">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="skeleton-circle"></div>
                ))}
              </div>
            </div>
            <div className="skeleton-description">
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text skeleton-short"></div>
            </div>
            <div className="skeleton-buttons">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInforSkeleton;
