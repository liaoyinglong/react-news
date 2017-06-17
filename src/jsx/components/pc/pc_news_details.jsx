import React, { Component } from 'react'
import { Row, Col, BackTop } from 'antd'

import PCHeader from './pc_header'
import PCFooter from './pc_footer'
import PCNewsImgBlock from './pc_news_img_block'
import Comments from '../common/comments'


import { getNewsHtml } from 'asset/ajax'

export default class PCNewsDetails extends Component {
  constructor() {
    super()
    this.state = {
      newsItem: ''
    }
  }
  componentDidMount() {
    // this.props.params.uniquekey 拿到的是router传进来的参数
    getNewsHtml(this.props.params.uniquekey, res => {
      this.setState({ newsItem: res.data })
      // 最后一段固定标题对SEO更加友好
      document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台"
    })
  }

  creatMarkup() {
    // 直出html  渲染已经写好的html
    return { __html: this.state.newsItem.pagecontent }
  }

  render() {
    return (
      <div>
        <BackTop />
        <PCHeader />
        <Row>
          <Col span={2}></Col>
          <Col span={14} className='container'>
            <div className='articleContainer' dangerouslySetInnerHTML={this.creatMarkup()}></div>
            <hr />
            <Comments uniquekey={this.props.params.uniquekey} />
          </Col>
          <Col span={6}>
            <PCNewsImgBlock type='top' count='44' width='100%' cartTitle='相关新闻' imageWidth='150px' />
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter />
      </div>
    )
  }
}

