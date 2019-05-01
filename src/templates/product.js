import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'

export const ProductTemplate = (
  {
    id,
    name,
    price,
    description,
    tags,
    featuredimage,
    helmet,
    galleryImages,
    contentComponent
  }) => {
  const PostContent = contentComponent || Content
  console.log('name ${name}', name)
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <p>{description}</p>
            <p>${price}</p>
            <button
              className="snipcart-add-item"
              data-item-id={id.toString()}
              data-item-name={name}
              data-item-price={price}
              data-item-url={"https://cms-snipcart.netlify.com/product/3"}
              data-item-description="Some fresh bacon">
              Buy bacon
            </button>
            {/*<PostContent content={content} />*/}
            <Img fluid={featuredimage.childImageSharp.fluid} />
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
  return (
    <Layout>
      <ProductTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={item.description}
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
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        description
        id
        tags
        name
        price
        galleryImages {
          childImageSharp{
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        featuredimage{
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
