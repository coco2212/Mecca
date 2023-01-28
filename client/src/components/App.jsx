import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import ProductDetail from './ProductDetail.jsx';
import RelatedItems from './RelatedItems.jsx';
import QuestionsAnswers from './QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews.jsx';

function App() {
  // props for multiple widgets
  // states that multiple widgets need access to
  const productID = 40345;
  const urls = [
    `/api/products/${productID}`, // get products by id
    `/api/products/${productID}/styles`, // get styles by product id
    `/api/reviews/meta?product_id=${productID}`, // get review metadata by id
  ];

  const [currentProduct, setCurrentProduct] = useState({});
  const [productStyle, setProductStyle] = useState({});
  const [reviewMetadata, setReviewMetadata] = useState({});

  useEffect(() => {
    const requests = urls.map((url) => axios.get(url));

    axios.all(requests)
      .then((responses) => {
        setCurrentProduct(responses[0].data);
        setProductStyle(responses[1].data);
        setReviewMetadata(responses[2].data);
      });
  }, []);

  return (
    <div>
      <p>Hello from Team Coco</p>
      <ProductDetail
        reviewMetadata={reviewMetadata}
        productStyle={productStyle}
        product={currentProduct}
      />
      <RelatedItems
        reviewMetadata={reviewMetadata}
        productStyle={productStyle}
        product={currentProduct}
      />
      <QuestionsAnswers product={currentProduct} />
      <RatingsReviews reviewMetadata={reviewMetadata} product={currentProduct} />
    </div>
  );
}

export default App;
