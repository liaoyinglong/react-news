import React from 'react'
import { Card } from 'antd'
import { Router, Route, Link, browserHistory } from 'react-router'

import { getNews } from 'asset/ajax.js'

export default class PCNewsImgBlock extends React.Component {
  constructor() {
    super()
    this.state = {
      news: ''
    }
  }

  componentWillMount() {
    getNews({
      type: this.props.type,
      count: this.props.count
    }, res => {
      this.setState({ news: res.data })
    })
  }

  render() {
    const styleImage = {
      display: 'block',
      width: this.props.imageWidth,
      height: '90px'
    }
    const styleH3 = {
      width: this.props.imageWidth,
      // 纯css控制超出显示 三个点 ...
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
    const { news } = this.state
    const ImgsList = news.length
      ?
      // 此处有个坑   这个函数的返回值是用小括号括起来的，而不是大括号，因为返回的是html片段
      news.map((item, index) => (
        <div key={index} className='imageblock'>
          <Link to={`details/${item.ununiquekey}`} target='_blank'>
            <div className="custom-image">
              <img src={item.thumbnail_pic_s} alt="" style={styleImage} />
            </div>
            <div className="custom-card">
              <h3 style={styleH3}>{item.title}</h3>
              <p>{item.author_name}</p>
            </div>
          </Link>
        </div>
      ))
      : '没有加载到任何新闻'
    // console.log(newsList)
    return (
      <div className='topNewsList'>
        <Card title={this.props.cartTitle} bordered style={{ width: this.props.width }}>
          {ImgsList}
        </Card>
      </div >
    )
  }
}