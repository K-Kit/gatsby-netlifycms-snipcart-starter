import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import { Box, Thumbnail, commonProps } from '../styled'
import Layout from '../components/Layout'
import Img from '../components/PreviewCompatibleImage'
import { Gallery } from '../templates/product-page-template'
import {css} from 'styled-components/macro'
const Page = ({ data }) => {
  const products = data.allMarkdownRemark.edges


  return (
    <Layout>

      <Box mt={20} width={1} display={'flex'} flexWrap={'wrap'} alightContent={'stretch'} alignItems={'stretch'}>
        {products.map(edge => {
          const { frontmatter } = edge.node
          const [selectedImage, setSelectedImage] = useState(
            frontmatter.images[0]
          )
          return (
            <Box width={[1,1/2,1/3,1/4]} height={'fit-content'} display={'flex'} p={10} justifyContent={'center'} flexDirection={'column'}>

              <Link to={`/products/${frontmatter.id}`}>
                <h1>{frontmatter.title}</h1>
              </Link>
              <Gallery
                images={frontmatter.images}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
                productPage={false}
              />

            </Box>
          )
        })}
      </Box>
    </Layout>
  )
}
export default Page

export const pageQuery = graphql`
  fragment productMatter on MarkdownRemarkFrontmatter {
          id
          title
          description
          tags
          price
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
            combinedAttributes
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
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }

query {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/products/"}}) {
    edges {
      node {
        id
        frontmatter {
          ...productMatter
        }
      }
    }
  }
}
`
