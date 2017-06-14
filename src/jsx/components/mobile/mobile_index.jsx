import React from 'react'

import MobileHeader from './mobile_header'
import MobileFooter from './mobile_Footer'


export default class MobileIndex extends React.Component {
  render() {
    return (
      <div id='mobile'>
        <MobileHeader />
        <MobileFooter />
      </div>
    )
  }
}
