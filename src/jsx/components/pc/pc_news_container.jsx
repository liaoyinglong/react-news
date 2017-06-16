import React from 'react'
import { Row, Col, Tabs, Carousel } from 'antd'

import PCNewsBlock from './pc_news_block'
import PCNewsImgBlock from './pc_news_img_block'
const TabPane = Tabs.TabPane

const img1 = require('../../../images/carousel_1.jpg')
const img2 = require('../../../images/carousel_2.jpg')
const img3 = require('../../../images/carousel_3.jpg')
const img4 = require('../../../images/carousel_4.jpg')

export default class PCNewContainer extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    }


    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className='container'>
            <div className="leftContainer">
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
              </div>
              <PCNewsImgBlock type='yule' count='6' width='400px' cartTitle='娱乐新闻' imageWidth='112px' />
            </div>
            <Tabs className='tabs_news'>
              <TabPane tab='头条新闻' key='1'>
                <PCNewsBlock count={22} type='top' width='100%' bordered='false' />
              </TabPane>
              <TabPane tab='国内新闻' key='2'>
                <PCNewsBlock count={22} type='guonei' width='100%' bordered='false' />
              </TabPane>
              <TabPane tab='娱乐新闻' key='3'>
                <PCNewsBlock count={22} type='yule' width='100%' bordered='false' />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}