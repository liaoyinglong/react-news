import React from 'react'
import { Row, Col } from 'antd'


import 'stylus/pc_header'

export default class PCHeader extends React.Component {
  render() {
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className='logo'>
              <img src="/src/images/logo.png" alt="" />
            </a>
          </Col>
          <Col span={2}></Col>
          <Col span={2}></Col>
        </Row>
      </header>
    )
  }
}
