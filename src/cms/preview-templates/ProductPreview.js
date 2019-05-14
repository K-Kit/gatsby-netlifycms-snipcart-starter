import {ProductTemplate} from '../../templates/product'
import React, { useState } from "react";
import { HTMLContent } from "../../components/Content";
import Helmet from "react-helmet";

const ProductPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()
  console.log(data)
  data.images = data.images.map(url => ({src: url, image: url}))
  const selectedImage = data.images[0]
  const setSelectedImage = () => (console.log('cannot change image in preview'))
  return (
  <ProductTemplate

    selectedImage={selectedImage}
    setSelectedImage={setSelectedImage}
    {...data}
  />
)};

export default ProductPreview
