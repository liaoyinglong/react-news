import React from 'react'
import ReactDOM from 'react-dom'
// 引入 antd的样式
import 'antd/lib/button/style/css'

import MediaQuery from 'react-responsive'
// pc端
import PCIndex from 'pc/pc_index'
// 移动端
import MobileIndex from 'mobile/mobile_index'

class Header extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width:1224px)'><PCIndex /></MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'><MobileIndex /></MediaQuery>
      </div>
    )
  }
}

ReactDOM.render(
  <Header />, document.getElementById('app'))