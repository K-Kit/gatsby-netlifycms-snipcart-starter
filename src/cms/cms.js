import React from 'react'
import CMS from 'netlify-cms'
import '@material-ui/core'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ProductPreview from './preview-templates/ProductPreview'
import { StyleSheetManager } from 'styled-components'

//Component used to Enable netlify CMS to apply the styles added through styled-components
class CSSInjector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      iframeRef: '',
    }
  }

  componentDidMount() {
    const iframe = document.getElementsByTagName('iframe')[0]
    const iframeHeadElem = iframe && iframe.contentDocument.head
    this.setState({ iframeRef: iframeHeadElem })
  }

  render() {
    return (
      <div>
        {this.state.iframeRef && (
          <StyleSheetManager target={this.state.iframeRef}>
            {this.props.children}
          </StyleSheetManager>
        )}
      </div>
    )
  }
}
const Wrapped = (Preview, props) => {
  return (
    <CSSInjector>
      <Preview {...props} />
    </CSSInjector>
  )
}

CMS.registerPreviewTemplate('index', props => (
  <CSSInjector>
    <IndexPagePreview {...props} />{' '}
  </CSSInjector>
))
CMS.registerPreviewTemplate('about', props => Wrapped(AboutPagePreview, props))
CMS.registerPreviewTemplate('blog', props => Wrapped(BlogPostPreview, props))
CMS.registerPreviewTemplate('products', props => Wrapped(ProductPreview, props))
