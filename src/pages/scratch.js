import { graphql } from "gatsby";
import React from "react"
import { Grid, Box, } from "@material-ui/core"
import Img from "gatsby-image"
import Typography from "@material-ui/core/Typography/Typography";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import {Thumbnail} from "../components/PreviewCompatibleImage"
import VariantSelectControl from "../components/VariantSelectControl";
const page = (props) => {
  const product = props.data.markdownRemark.frontmatter;
  // const {variants, options} = product;
  return (
    <>
      <VariantSelectControl product={product}/>
    </>
  )
}

export const pageQuery = graphql`
  query Product{
    markdownRemark(frontmatter: {id: { eq: "32862038594" }}) {
      frontmatter {
          ...productMatter
        }
    }
  }
`;

export default page
