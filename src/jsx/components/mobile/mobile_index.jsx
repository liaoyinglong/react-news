import React from 'react'

import { Tabs, Carousel } from 'antd'
const TabPane = Tabs.TabPane
import MoblieList from './mobile_list'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'

const img1 = require('../../../images/carousel_1.jpg')
const img2 = require('../../../images/carousel_2.jpg')
const img3 = require('../../../images/carousel_3.jpg')
const img4 = require('../../../images/carousel_4.jpg')

export default class MobileIndex extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    }
    return (
      <div id='mobile'>
        <MobileHeader />
        <Tabs>
          <TabPane tab='头条' key="1">
            <div className="carousel">
              <Carousel {...settings}>
                <div>
                  <img src={img1} alt="" />
                </div>
                <div>
                  <img src={img2} alt="" />
                </div>
                <div>
                  <img src={img3} alt="" />
                </div>
                <div>
                  <img src={img4} alt="" />
                </div>
              </Carousel>
              <MoblieList count={20} type='top' />
            </div>
          </TabPane>
          <TabPane tab='社会' key="2">
            <MoblieList count={20} type='shehui' />
          </TabPane>
          <TabPane tab='国内' key="3">
            <MoblieList count={20} type='guonei' />
          </TabPane>
          <TabPane tab='国际' key="4">
            <MoblieList count={20} type='guoji' />
          </TabPane>
          <TabPane tab='娱乐' key="5">
            <MoblieList count={20} type='yule' />
          </TabPane>
        </Tabs>
        <MobileFooter />
      </div>
    )
  }
}
