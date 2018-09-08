import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Router, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import AppRoutes from './router'
// import RouteWrapper from './RouteWrapper'
import './index.css'

const { Footer, Sider, Content } = Layout

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1)
  }
  return str
}

class KafeApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      collapsed: true
    }
  }

  componentDidMount () {
    console.log('container mounted')
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps, 'props of container')
    console.log('will receive props')
  }

  updateWindowDimensions = () => {
    const { innerHeight, innerWidth } = window
    const { height, width } = this.state
    if (height !== innerHeight || width !== innerWidth) {
      this.setState({
        width: innerWidth,
        height: innerHeight
      })
    }
  }

  render () {
    console.log('container is rerendering')
    const url = stripTrailingSlash(this.props.match.url)
    return (
      <Layout
        style={{minHeight: 300, height: this.state.height}}
      >
        <Layout>
          <Sidebar url={url}/>
          <Content style={{background: '#fff', minHeight: 280, height: this.state.height - 80}}>
            <AppRoutes url={url} />
            {/* <RouteWrapper /> */}
          </Content>
        </Layout>
        <Footer style={{
          background: 'blue',
          padding: 0,
          height: 80
        }}>
          {/* <Icon
            className='trigger'
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => this.toggle()}
          /> */}
        </Footer>
      </Layout>
    )
  }
}

export default KafeApp