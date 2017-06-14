import React from 'react'
import ReactDOM from 'react-dom'
// 引入 antd的样式
import 'antd/lib/button/style/css'


import PCIndex from './components/pc/PC_index'
class Header extends React.Component {
  render() {
    return (
      <div>
        <PCIndex />
      </div>
    )
  }
}

ReactDOM.render(
  <Header />, document.getElementById('app'))