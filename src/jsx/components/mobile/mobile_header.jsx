import React from 'react'

import { loginOrRegister } from 'asset/ajax.js'

import { Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

import 'stylus/mobile/mobile_header'

class MobileHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0,
      formLayout: 'horizontal',
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
    loginOrRegister('register', formData, res => {
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
  login() {
    this.setModalVisible(true)
  }
  render() {
    let { getFieldDecorator } = this.props.form
    const userShow = this.state.hasLogined
      ?
      <Icon type='setting' onClick={this.login.bind(this)}></Icon>
      :
      <Icon type='login' onClick={this.login.bind(this)}></Icon>
    return (
      <div>
        <div id="mobileheader">
          <header>
            <img src="./src/images/logo.png" alt="logo" />
            <span>ReactNews</span>
            {userShow}
          </header>
        </div>
        <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText='关闭'>
          <Tabs type='card'>
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
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader)

