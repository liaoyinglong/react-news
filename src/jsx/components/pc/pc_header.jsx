import React from 'react'
import { Link } from 'react-router'
import { loginOrRegister } from 'asset/ajax.js'

import { Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const logoImg = require('../../../images/logo.png')


class PCHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0,
    }
  }
  componentWillMount() {
    if (localStorage.userId != '') {
      this.setState({ hasLogined: true })
      this.setState({
        userNickName: localStorage.userNickName,
        userId: localStorage.userId
      })
    }
  }
  // this.setState is a function
  setModalVisible(value) {
    this.setState({ modalVisible: value })
  }
  handleSubmit(e) {
    e.preventDefault()
    // 为什么是this.props.form.getFieldsValue 因为在render的时候定义了 let {getFieldDecorator} = this.props.form
    let formData = this.props.form.getFieldsValue()
    // console.log(formData)
    loginOrRegister(this.state.action, formData, res => {
      // console.log(res)
      res = res.data
      this.setState({ userNickName: res.NickUserName, userId: res.UserId })
      localStorage.userId = res.UserId
      localStorage.userNickName = res.NickUserName
      if (this.state.action === 'login') { this.setState({ hasLogined: true }) }
      message.success("请求成功！")
      this.setModalVisible(false)
    })
  }
  handleClick(e) {
    if (e.key === 'register') {
      this.setState({ current: 'register' })
      this.setModalVisible(true)
      return
    }
    this.setState({ current: e.key })
  }
  logout() {
    localStorage.userId = ''
    localStorage.userNickName = ''
    this.setState({ hasLogined: false })
  }
  callback(key) {
    if (key == 1) { this.setState({ action: 'login' }) }
    if (key == 2) { this.setState({ action: 'register' }) }
  }
  render() {
    // es6解构
    let { getFieldDecorator } = this.props.form
    const userShow = this.state.hasLogined
      ?
      <Menu.Item key='logout' className='register'>
        <Button type='primary' htmlType='button'>{this.state.userNickName}</Button>
        &nbsp;&nbsp;<Link target='_blank' to={`/usercenter`}>
          <Button type='dashed' htmlType='button'>个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
      </Menu.Item>
      :
      <Menu.Item key='register' className='register'>
        <Icon type='login' />注册 / 登录
      </Menu.Item>
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className='logo'>
              <img src={logoImg} alt="logo" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={17}>
            <Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
              <Menu.Item key='top'><Icon type='appstore' /> 头条</Menu.Item>
              <Menu.Item key='shehui'><Icon type='appstore' /> 社会</Menu.Item>
              <Menu.Item key='guonei'><Icon type='appstore' /> 国内</Menu.Item>
              <Menu.Item key='guoji'><Icon type='appstore' /> 国际</Menu.Item>
              <Menu.Item key='yule'><Icon type='appstore' /> 娱乐</Menu.Item>
              <Menu.Item key='tiyu'><Icon type='appstore' /> 体育</Menu.Item>
              <Menu.Item key='keji'><Icon type='appstore' /> 科技</Menu.Item>
              <Menu.Item key='shishang'><Icon type='appstore' /> 时尚</Menu.Item>
              {userShow}
            </Menu>
            <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText='关闭'>
              <Tabs type='card' onChange={this.callback.bind(this)} animated>
                <TabPane tab='登录' key='1'>
                  <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label='账户'>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的账号" />
                        )}
                    </FormItem>
                    <FormItem label='密码'>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" />
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </TabPane>
                <TabPane tab='注册' key='2'>
                  <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label='账户'>
                      {getFieldDecorator('r_userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的账号" />
                        )}
                    </FormItem>
                    <FormItem label='密码'>
                      {getFieldDecorator('r_password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" />
                        )}
                    </FormItem>
                    <FormItem label='确认密码'>
                      {getFieldDecorator('r_confirmPassword', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请确认您的密码" />
                        )}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    )
  }
}
// 要做二次封装 https://ant.design/components/form-cn/#Form.create(options)
export default PCHeader = Form.create({})(PCHeader)