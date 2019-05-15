import React, { useState } from "react";
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Img from '../components/PreviewCompatibleImage'
import {Grid} from '@material-ui/core'
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components"
import Paper from "@material-ui/core/Paper/Paper";
import {
  space,
  color,
  width,
  fontSize,
  display,
  flex
} from 'styled-system'


const Box = styled.div`
  ${color}
  ${width}
  ${display}
  ${flex}
  justify-content: center;

`;
const Thumbnail = styled.a`
${width};
  width: 56px;
  justify-content: center;
`
export const ProductTemplate = (
  {
    id,
    title,
    description,
    tags,
    featuredimage,
    variants,
    options,
    images,
    helmet,
    selectedImage, setSelectedImage
  }) => {
  let price = 99.99
  return (
    <Grid container>
      {helmet || ''}
            {/*<PostContent content={content} />*/}
            <Grid item xs={12} md={6} spacing={24}>
                <Box bg={"red"}
                     width={[1,1,1, 1/2]}
                     display={"inline-block"}

                >
                  <Box m={2} >
                    {images && images.length && <Img imageInfo={selectedImage} />}
                  </Box>
                  {/* todo add select on hover */}
                  <Box display={'inline-flex'}>
                    {images && images.map((image, i) => {
                      return (
                        <Thumbnail m={1/4} width={1} onClick={() => setSelectedImage(image)}  display={'inline-block'} >
                          <Img imageInfo={image} />
                        </Thumbnail>
                      )
                    })}
                  </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>

                  <h1>{title}</h1>
                  {/*
                            variant options
                            price datas for variant
                          */}
                  <p>
                    {description}
                  </p>
                  <Button
                    className="snipcart-add-item"
                    data-item-id={id}
                    data-item-name={title}
                    data-item-price={price}
                    data-item-url={"localhost:8000/"}
                    data-item-description="todo">
                    Buy Now
                  </Button>
            </Grid>


              </Grid>
  )
}

ProductTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Product = ({ data }) => {
  const { markdownRemark: post } = data
  const item = post.frontmatter

  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  return (
    <Layout>
      <ProductTemplate
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${item.title}`}</title>
            <meta
              name="description"
              content={`${item.description}`}
            />
          </Helmet>
        }
        {...item}
      />
    </Layout>
  )
}

Product.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Product

export const pageQuery = graphql`
  query ProductById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        id
        title
        description
        tags

        featuredimage{
          childImageSharp{
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }

        variants {
          skuAttr
          pricing
          discount
        }
        options {
          title
          options {
            optionId
            text
            src {
              id
              childImageSharp{
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        images {
          childImageSharp{
            fluid(maxHeight: 320) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
