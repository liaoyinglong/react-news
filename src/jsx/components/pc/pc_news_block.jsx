import React from 'react'
import { Card } from 'antd'
import { Router, Route, Link, browserHistory } from 'react-router'


import { getNews } from 'asset/ajax.js'

export default class PCNewsBlock extends React.Component {
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
    const { news } = this.state
    const newsList = news.length
      ?
      // 此处有个坑   这个函数的返回值是用小括号括起来的，而不是大括号，因为返回的是html片段
      news.map((item, index) => (
        <li key={index}>
          <Link to={`details/${item.uniquekey}`} target='_blank'>{item.title}</Link>
        </li>
      ))
      : '没有加载到任何新闻'
    // console.log(newsList)
    return (
      <div className='topNewsList'>
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    )
  }
}