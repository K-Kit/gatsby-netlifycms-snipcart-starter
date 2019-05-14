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
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {/*<PostContent content={content} />*/}
            <Grid container>
              <Grid item container spacing={16} xs={12} lg={6} alignItems={"center"}>
                <Grid item container direction={"row"}  xs={2} spacing={8}
                >
                  {/* todo add select on hover */}
                  {images && images.map((image, i) => {
                    return (
                      <Grid item xs onClick={() => setSelectedImage(image)}>
                        <Img imageInfo={image} />
                      </Grid>
                    )
                  })}
                </Grid>
                {/* TODO spotlight: add onclick lightbox */}
                <Grid item lg xs={12} lg={10}>
                  {images && images.length && <Img imageInfo={selectedImage} />}
                </Grid>
              </Grid>

              <Grid container item lg={6} xs={12}>
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

              {/*todo add related products, categories, tags, reviews*/}
            </Grid>
            {/*{tags && tags.length ? (*/}
              {/*<div style={{ marginTop: `4rem` }}>*/}
                {/*<h4>Tags</h4>*/}
                {/*<ul className="taglist">*/}
                  {/*{tags.map(tag => (*/}
                    {/*<li key={tag + `tag`}>*/}
                      {/*<Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>*/}
                    {/*</li>*/}
                  {/*))}*/}
                {/*</ul>*/}
              {/*</div>*/}
            {/*) : null}*/}
          </div>
        </div>
      </div>
    </section>
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
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
