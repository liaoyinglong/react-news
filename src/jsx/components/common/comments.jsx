import React from 'react'
import { Router, route, Link, browserHistory } from 'react-router'

import { Row, Col, Form, Input, Button, Card, notification,Menu,Tabs  } from 'antd'
const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const TabPane = Tabs.TabPane
const MenuItemGroup = Menu.ItemGroup

import { getComments, addComments, addCollection } from 'asset/ajax'

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'ReactNews 提醒',
    description: '收藏该文章成功',
  })
}


class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      comments: ''
    }
  }

  componentDidMount() {
    // this.props.params.uniquekey 拿到的是router传进来的参数
    getComments(this.props.uniquekey, res => {
      // 只拿最新的50条评论，太多了很卡
      this.setState({ comments: res.data.slice(res.data.length - 50, res.data.length) })
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    // 获取表单元素的值，ant design提供
    let formData = this.props.form.getFieldsValue()
    addComments({
      userid: localStorage.userId,
      uniquekey: this.props.uniquekey,
      commnet: formData.commnet
    }, () => {
      this.componentDidMount()
      this.props.form.resetFields()
    })
    // 直接调用生命周期的钩子可以让组件重新加载
  }

  addUserCollection() {
    addCollection({
      userid: localStorage.userId,
      uniquekey: this.props.uniquekey,
    }, res => {
      // 收藏成功之后进行全局的提醒
      openNotificationWithIcon('success')
    })
  }
  render() {
    let { getFieldDecorator } = this.props.form
    let { comments } = this.state
    const commentsList = comments.length
      ?
      comments.map((item, index) => (
        <Card key={index} title={item.UserName} extra={<a href="#">发表于{item.datetime}</a>}>
          <p>{item.Comments}</p>
        </Card>
      ))
      :
      '没有加载到任何评论'
    return (
      <div className='comments'>
        <Row>
          <Col span={24}>
            {commentsList}
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label='您的评论'>
                {getFieldDecorator('commnet')(
                  <Input type='textarea' placeholder="请输入您的评论" />
                )}
              </FormItem>
              <Button type='primary' htmlType='submit'>提交评论</Button>
              &nbsp;&nbsp;
              <Button type='primary' htmlType='button' onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Comments = Form.create({})(Comments)