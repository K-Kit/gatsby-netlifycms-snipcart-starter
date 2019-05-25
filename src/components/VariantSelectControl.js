import React from "react"
import { Grid, Box, } from "@material-ui/core"
import Typography from "@material-ui/core/Typography/Typography";
import ButtonBase from "@material-ui/core/Button/Button";
import Img from "./PreviewCompatibleImage"
import styled, {css} from 'styled-components/macro'

const Button = (props) => <Box component={ButtonBase}  borderRadius={16} border={"2px solid blue"} {...props} />

// todo product select callbacks
// accepts product frontmatter
const VariantSelectControl = ({product}) => {
  const {variants, options} = product;
  return (
    <>
      <Box style={{overflowX: 'scroll'}}>
        {options.map(optionType => {
          return (
            <Box display={"flex"} >
              {optionType.options.map(({optionId, text, src}, i) => {
                const optionVariants = variants.filter(variant => variant.combinedAttributes.includes(optionId))
                //if it has an image component or just text option
                return ( src ?
                    <Box onClick={() => {console.log(text, optionVariants)} } width={"80px"} height={"80px"}>
                      <Box component={Img}  imageInfo={src} alt={text}  />
                    </Box>:
                      <Button> {text} </Button>
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
