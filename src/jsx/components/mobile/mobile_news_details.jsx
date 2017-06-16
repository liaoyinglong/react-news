import React, { Component } from 'react'
import { Row, Col, BackTop } from 'antd'

import MobileHeader from './mobile_header'
import MobileFooter from './mobile_Footer'


import { getNewsHtml } from 'asset/ajax'

export default class MobileNewsDetails extends Component {
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
      <div id='mobileDetailsContainer'>
        <BackTop />
        <MobileHeader />
        <div className="ucmobileList">
          <Row>
            <Col span={24} className='container'>
              <div className='articleContainer' dangerouslySetInnerHTML={this.creatMarkup()}></div>
            </Col>
          </Row>
        </div>
        <MobileFooter />
      </div>
    )
  }
}

