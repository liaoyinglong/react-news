import React from 'react'

import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'

import { Tabs, Row, Col, Upload, Icon, Modal, Card } from 'antd'
const TabPane = Tabs.TabPane

import { getUserCollection, getUserComments } from 'asset/ajax'

export default class MobileUeserCenter extends React.Component {
  constructor() {
    super()
    this.state = {
      usercollection: '',
      usercomments: '',
      previewVisible: false,
      previewImage: ''
    }
  }

  componentDidMount() {
    getUserCollection({
      userid: localStorage.userId
    }, res => {
      this.setState({ usercollection: res.data })
    })
    getUserComments({
      userid: localStorage.userId
    }, res => {
      this.setState({ usercomments: res.data })
    })
    document.title = "我的收藏列表 - React News | React 驱动的新闻平台"
  }

  handleCancel() {
    this.setState({ previewVisible: false })
  }
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  tabsChange(key) {
    switch (key) {
      case '1':
        document.title = "我的收藏列表 - React News | React 驱动的新闻平台"
        break
      case '2':
        document.title = "我的评论列表 - React News | React 驱动的新闻平台"
        break
      case '3':
        document.title = "头像设置 - React News | React 驱动的新闻平台"
        break
      default:
        console.log(4)
        break
    }
  }


  render() {
    const props = {
      // 暂无接口，随便的写的 
      action: 'http://tuchuang.org/api.php?gettoken=file',
      header: {
        'Access-Control-Allow-Origin': '*'
      },
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: 'code.png',
        state: 'done',
        url: 'https://avatars0.githubusercontent.com/u/23382699?v=3&s=460',
        thumbUrl: 'https://avatars0.githubusercontent.com/u/23382699?v=3&s=460'
      }],
      onPreview: file => {
        this.setState({
          previewImage: file.url,
          previewVisible: true
        })
      }
    }
    const { usercollection, usercomments } = this.state
    const usercollectionList = usercollection.length
      ?
      usercollection.map((item, index) => (
        <Card title={item.uniquekey} key={index} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
          <p>{item.Title}</p>
        </Card>
      ))
      :
      '您还没有收藏任何新闻，快去收藏一些新闻吧'
    const usercommentsList = usercomments.length
      ?
      usercomments.map((comment, index) => (
        <Card key={index} title={`于 ${comment.datetime} 评论了文章 `} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      :
      '您还没有发表过任何评论。';
    return (
      <div>
        <MobileHeader />
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab='我的收藏列表' key={1}>
                <div className='comment'>
                  <Row>
                    <Col span={24}>{usercollectionList}</Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab='我的评论列表' key={2}>
                <div className="comment">
                  <Row>
                    <Col span={24}>
                      {usercommentsList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab='头像设置' key={3}>
                <div className="clearfix">
                  <Upload {...props} onPreview={this.handlePreview.bind(this)}>
                    <Icon type="plus" />
                    <div className="ant-upload-text">
                      上传照片
                     </div>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                      <img src={this.state.previewImage} alt="预览" />
                    </Modal>
                  </Upload>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>

        <MobileFooter />
      </div>
    )
  }

}
