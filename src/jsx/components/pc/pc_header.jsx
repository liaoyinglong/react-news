import React from 'react'

import { Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

import 'stylus/pc/pc_header'

class PCHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    }
  }
  // this.setState is a function
  setModalVisible(value) {
    this.setState({ modalVisible: value })
  }
  handleSubmit() {
  
  }
  handleClick(e) {
    if (e.key === 'register') {
      this.setState({ current: 'register' })
      this.setModalVisible(true)
      return
    }
    this.setState({ current: e.key })
  }
  render() {
    let { getFieldDecorator } = this.props.form
    const userShow = this.state.hasLogined
      ?
      <Menu.Item key='logout' className='register'>
        <Button type='primary' htmlType='button'>{this.state.userNickName}</Button>
        &nbsp;&nbsp;
        <Link target='_blank'>
          <Button type='dashed' htmlType='button'>个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type='ghost' htmlType='button'>退出</Button>
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
              <img src="/src/images/logo.png" alt="logo" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
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
              <Tabs type='card'>
                <TabPane tab='注册' key='2'>
                  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label='账户'>
                      <Input placeholder='请输入您的账号' {...getFieldDecorator('r_userName') } />
                    </FormItem>
                    <FormItem label='密码'>
                      <Input type='password' placeholder='请输入您的密码' {...getFieldDecorator('r_password') } />
                    </FormItem>
                    <FormItem label='确认密码'>
                      <Input type='password' placeholder='请确认您的密码' {...getFieldDecorator('r_confirmPassword') } />
                    </FormItem>
                    <Button type='primary' htmlType='submit'>注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
          <Col span={2}></Col>
        </Row>
      </header>
    )
  }
}
// 要做二次封装 https://ant.design/components/form-cn/#Form.create(options)
export default PCHeader = Form.create({})(PCHeader)