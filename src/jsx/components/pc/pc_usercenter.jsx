import React from 'react'

import PCHeader from './pc_header'
import PCFooter from './pc_footer'

import { Tabs } from 'antd'

const TabPane = Tabs.TabPane

export default class PCUeserCenter extends React.Component {
  render() {
    return (
      <div>
        <PCHeader />
        <Tabs>
          <TabPane tab='我的收藏列表' key={1}>

          </TabPane>
          <TabPane tab='我的评论列表' key={2}>

          </TabPane>
          <TabPane tab='头像设置' key={3}>

          </TabPane>
        </Tabs>
        <PCFooter />
      </div>
    )
  }

}
