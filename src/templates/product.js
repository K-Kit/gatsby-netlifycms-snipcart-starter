import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

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

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          {/*<div className="column is-10 is-offset-1">*/}
            {/*<h1 className="title is-size-2 has-text-weight-bold is-bold-light">*/}
              {/*{name}*/}
            {/*</h1>*/}
            {/*<p>{description}</p>*/}
            {/*<PostContent content={content} />*/}
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
          {/*</div>*/}
        </div>
      </div>
    </section>
  )
}

ProductTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Product = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProductTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
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
        title
        description
        tags
      }
    }
  }
`
