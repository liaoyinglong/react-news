import React from 'react'

import PCHeader from './pc_header'
import PCFooter from './pc_footer'

import { Tabs, Row, Col, Upload, Icon, Modal } from 'antd'

const TabPane = Tabs.TabPane

export default class PCUeserCenter extends React.Component {
  constructor() {
    super()
    this.state = {
      previewVisible: false,
      previewImage: ''
    }
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
    return (
      <div>
        <PCHeader />
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab='我的收藏列表' key={1}>

              </TabPane>
              <TabPane tab='我的评论列表' key={2}>

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
          <Col span={2}></Col>
        </Row>

        <PCFooter />
      </div>
    )
  }

}
