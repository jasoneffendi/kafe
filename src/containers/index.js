import React, { Component } from 'react'
import { Layout, Menu, Icon, Button } from 'antd'
import { Router, Link } from 'react-router-dom'
import { Column, Table, AutoSizer } from 'react-virtualized';
// import { remote } from 'electron'
import Sidebar from './Sidebar'
import AppRoutes from './router'
import './index.css'

const { remote } = window.require('electron')
const windowActions = remote.getCurrentWindow();
const { Header, Footer, Sider, Content } = Layout

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

  minimizeWindow () {
    windowActions.minimize();
  }

  maximizeWindow () {
    if (!windowActions.isMaximized()) {
      windowActions.maximize();
    } else {
      windowActions.unmaximize();
    }
  }

  closeWindow () {
    windowActions.close();
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
    const { height, width } = this.state
    const headerHeight = 20
    const minHeight = 300
    const minFooterHeight = 100
    return (
      <Layout
        style={{minHeight, height: this.state.height}}
      >
        <Layout>
          <Sidebar url={url}/>
          <Layout>
            <Header style={{textAlign: 'right'}}>
              <Button id="zero-align-icon" style={{ background: '#00ca56' }} size="small" shape="circle" icon="arrows-alt" onClick={() => this.maximizeWindow()} />
              <Button id="zero-align-icon" style={{ background: '#ffbd4c' }} size="small" shape="circle" icon="minus" onClick={() => this.minimizeWindow()} />
              <Button id="zero-align-icon" style={{ background: '#ff5c5c' }} size="small" shape="circle" icon="close" onClick={() => this.closeWindow()} />
            </Header>
            <Content style={{ minHeight: minFooterHeight, height: height - minFooterHeight}}>
              <AutoSizer>
                {
                  ({width, height}) => {
                    console.log(width, height, 'of autosizer')
                    // console.log(this.state.height)
                    return (
                      <AppRoutes url={url} height={height} width={width} />
                    )
                  }
                }
              </AutoSizer>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{
          background: 'blue',
          padding: 0,
          height: minFooterHeight
        }}>
        </Footer>
      </Layout>
    )
  }
}

export default KafeApp