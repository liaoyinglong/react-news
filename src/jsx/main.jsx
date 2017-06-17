import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

// 引入 antd的样式
import 'antd/lib/button/style/css'

// 引入自己写的样式
import '../stylus/mobile'
import '../stylus/pc'

// 引入媒体查询
import MediaQuery from 'react-responsive'

// pc端
import PCIndex from 'pc/pc_index'
import PCNewsDetails from 'pc/pc_news_details'
import PCUserCenter from 'pc/pc_usercenter'
// 移动端
import MobileIndex from 'mobile/mobile_index'
import MobileNewsDetails from 'mobile/mobile_news_details'


class Header extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={PCIndex}></Route>
            {/*route 传参数  :uniquekey 就是参数（形参） 他的值是在pc_news_block定义了 */}
            <Route path='/details/:uniquekey' component={PCNewsDetails}></Route>
            <Route path='/usercenter' component={PCUserCenter}></Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={MobileIndex}></Route>
            {/*route 传参数  :uniquekey 就是参数（形参） 他的值是在pc_news_block定义了 */}
            <Route path='/details/:uniquekey' component={MobileNewsDetails}></Route>
          </Router>
        </MediaQuery>
      </div>
    )
  }
}

ReactDOM.render(
  <Header />, document.getElementById('app'))