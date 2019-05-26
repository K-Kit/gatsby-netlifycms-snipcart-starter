import React, { useState } from "react";
import { Grid, Box, } from "@material-ui/core"
import Typography from "@material-ui/core/Typography/Typography";
import ButtonBase from "@material-ui/core/Button/Button";
import Img from "./PreviewCompatibleImage"
import styled, { css } from 'styled-components'

const Button =styled(ButtonBase)`
label {font-size: 8px;}
font-size: 8px;
`

const getViableVariants = (variants, optionId, shippingId) => {
  return (
    variants.filter(variant => variant.combinedAttributes.includes(optionId) &&  variant.combinedAttributes.includes(shippingId))
  )
}

// todo product select callbacks
// accepts product frontmatter
const VariantSelectControl = ({product}) => {
  const {variants, options, setPrice, setSelectedImage} = product;
  const china = options.filter(optionType => optionType.title == "Ships From")[0]
    .options.filter(op => op.text === "China")[0].optionId || '';
  const [shipId, setShipId] = useState(china);

  return (
    <>
      <Box mb={12}>
        {options.map(optionType => {
          if (optionType.title === "Ships From"){
            return
          }
          return (
            <Box display={"flex"} alignItems={"center"}>
              <label>{optionType.title}: </label>
              {optionType.options.map(({optionId, text, src}, i) => {
                const optionVariants = getViableVariants(variants,optionId, shipId);
                console.log(optionVariants)
                //if it has an image component or just text option
                return ( src ?
                    <Box onClick={() => {
                      setSelectedImage(src)
                      setPrice(parseFloat(optionVariants[0].pricing) * 1.2)
                    } } width={"80px"} height={"80px"}>
                      <Box component={Img}  imageInfo={src} alt={text}  />
                    </Box>:
                      <Button > {text} </Button>
                )
              })}
            </Box>
          )
        })}
      </Box>
    </>
  )
}


export default VariantSelectControl
