import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Img from '../components/PreviewCompatibleImage'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import Paper from '@material-ui/core/Paper/Paper'
import styled from 'styled-components'
import { Box, Thumbnail, commonProps } from '../styled'
import Layout from '../components/Layout'
import css from '@styled-system/css'

const FeaturedImage = styled(Img)`
  max-width: 360px;
`

const ProductDescription = styled(Box)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Raleway', serif;
    text-transform: uppercase;
    color: #292929;
  }
  h1 {
    font-size: 1.5em;
  }
  text-align: center;
`

export const Gallery = ({
  images,
  selectedImage,
  setSelectedImage,
  productPage = true,
}) => {
  const galleryWidth = productPage === true ? [1, 2 / 3, 1 / 2] : 1;
  return (
    <Box
      width={galleryWidth}
      display={'inline-flex'}
      justifyContent="center"
      alignContent={'center'}
      flexDirection={'column'}
    >
      <Box>
        {images && images.length && <FeaturedImage imageInfo={selectedImage} />}
      </Box>

      {/* todo add select on hover */}
      <Box width={[1]} height={1} display={'flex'}>
        {images &&
          images.map((image, i) => {
            return (
              <Thumbnail
                border={'2px groove'}
                m={1 / 4}
                p={2}
                width={1}
                onClick={() => setSelectedImage(image)}
                display={'inline-block'}
              >
                <Img imageInfo={image} />
              </Thumbnail>
            )
          })}
      </Box>
    </Box>
  )
}

export const ProductTemplate = ({
  id,
  title,
  description,
  tags,
  featuredimage,
  variants,
  options,
  images,
  helmet,
  selectedImage,
  setSelectedImage,
  price
}) => {
  console.log(variants, options)
  return (
      <Box
        width={[1]}
        justifyContent={'center'}
        justifySelf={'center'}
        display={'flex'}
      >
        {helmet || ''}
        {/*<PostContent content={content} />*/}
        <Gallery
          images={images}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />

        <ProductDescription width={[1 / 2]}>
          <h1>{title}</h1>
          {/*
                            variant options
                            price datas for variant
                          */}
          <p>{description}</p>
          <Button
            className="snipcart-add-item"
            data-item-id={id}
            data-item-name={title}
            data-item-price={price || 99.99}
            data-item-url={`https://cms-snipcart.netlify.com/products/${id}`}
            data-item-description={description}
          >
            Buy Now
          </Button>
        </ProductDescription>
      </Box>
  )
}

ProductTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ProductPageTemplate = ({ data }) => {
  const { markdownRemark: post } = data
  const item = post.frontmatter

  const [selectedImage, setSelectedImage] = useState(item.images[0])
  return (
    <Layout>
      <ProductTemplate
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${item.title}`}</title>
            <meta name="description" content={`${item.description}`} />
          </Helmet>
        }
        {...item}
      />
    </Layout>
  )
}

ProductPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        id
        title
        description
        tags

        featuredImage {
          childImageSharp {
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
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        images {
          childImageSharp {
            fluid(maxHeight: 360, maxWidth: 360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
