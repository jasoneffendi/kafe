import React, { Component } from 'react'
import AppRoutes from '../router'

class RouterWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log('app routes')
    const url = ''
    return (
      <AppRoutes url={url} />
    )
  }
}

export default RouterWrapper
