import React, { useState, useEffect } from 'react';
import './Sub_ProductDetail/styles/overview.css';
import ImageGallery from './Sub_ProductDetail/ImageGallery.jsx';
import ProductInfo from './Sub_ProductDetail/ProductInfo.jsx';
import StyleSelector from './Sub_ProductDetail/StyleSelector.jsx';
import AddToCart from './Sub_ProductDetail/AddToCart.jsx';
import ProductDesciption from './Sub_ProductDetail/ProductDesciption.jsx';
import ProductFeature from './Sub_ProductDetail/ProductFeature.jsx';

function ProductDetail({
  product, productStyle, productID, overviewRef,
  currentStyle, setCurrentStyle, reviewMetadata, reviewRef,
}) {
  const [startSelect, setStartSelect] = useState(false);

  useEffect(() => {
    setStartSelect(false);
    const styles = productStyle.results;
    const defaultStyle = styles.filter((style) => style['default?']);
    if (defaultStyle.length) {
      setCurrentStyle(defaultStyle[0]);
    } else {
      setCurrentStyle(styles[0]);
    }
  }, [product]);

  if (!currentStyle) {
    return null;
  }

  return (
    <div className="product-detail" ref={overviewRef}>
      <ImageGallery
        currentStyle={currentStyle}
        productID={productID}
      />
      <div className="product-text">
        <ProductInfo
          product={product}
          reviewMetadata={reviewMetadata}
          reviewRef={reviewRef}
        />
        <StyleSelector
          productStyle={productStyle}
          currentStyle={currentStyle}
          setCurrentStyle={setCurrentStyle}
          startSelect={startSelect}
          setStartSelect={setStartSelect}
        />
        <AddToCart
          product={product}
          skus={currentStyle.skus}
          startSelect={startSelect}
          currentStyle={currentStyle}
        />
      </div>
      <ProductDesciption product={product} />
      <ProductFeature product={product} />
    </div>
  );
}
export default ProductDetail;
