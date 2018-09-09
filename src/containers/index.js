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
    // document.getElementById("min-btn").addEventListener("click", function (e) {
    //   const window = remote.getCurrentWindow();
    //   window.minimize();
    // });
    
    // document.getElementById("max-btn").addEventListener("click", function (e) {
    //   const window = remote.getCurrentWindow();
    //   if (!window.isMaximized()) {
    //     window.maximize();
    //   } else {
    //     window.unmaximize();
    //   }
    // });
      
    // document.getElementById("close-btn").addEventListener("click", function (e) {
    //   const window = remote.getCurrentWindow();
    //   window.close();
    // });
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
    const { height, width } = this.state
    const minHeight = 300
    const minFooterHeight = 100
    return (
      <Layout
        style={{minHeight, height: this.state.height}}
      >
        <Layout>
          <Sidebar url={url}/>
          <div id="title-bar">
              <div id="title-bar-btns">
                    {/* <Button id="min-btn">-</Button>
                    <Button id="max-btn">+</Button>
                    <Button id="close-btn">x</Button> */}
                    
              </div>
              <Button onClick={() => console.log(windowActions.minimize())}>-</Button>
              <Button >+</Button>
              <Button >x</Button>
          </div>
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