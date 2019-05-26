import React from "react"
import { Grid, Box, } from "@material-ui/core"
import Typography from "@material-ui/core/Typography/Typography";
import ButtonBase from "@material-ui/core/Button/Button";
import Img from "./PreviewCompatibleImage"
import styled, { css } from 'styled-components'

const Button =styled(ButtonBase)`
label {font-size: 8px;}
font-size: 8px;
`

// todo product select callbacks
// accepts product frontmatter
const VariantSelectControl = ({product}) => {
  const {variants, options, setPrice, setSelectedImage} = product;
  return (
    <>
      <Box mb={12}>
        {options.map(optionType => {
          return (
            <Box display={"flex"} alignItems={"center"}>
              <label>{optionType.title}: </label>
              {optionType.options.map(({optionId, text, src}, i) => {
                const optionVariants = variants.filter(variant => variant.combinedAttributes.includes(optionId))
                //if it has an image component or just text option
                return ( src ?
                    <Box onClick={() => {setSelectedImage(src)} } width={"80px"} height={"80px"}>
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
