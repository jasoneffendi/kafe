import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import '../index.css'

const { Footer, Sider, Content } = Layout

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      collapsed: true
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions () {
    const { innerHeight, innerWidth } = window
    console.log(innerHeight)
    console.log(window)
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  toggle () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    return (
      <Layout
        style={{minHeight: 300, height: this.state.height}}
      >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            onMouseEnter={() => this.state.collapsed ? this.toggle() : ''}
            onMouseLeave={() => this.state.collapsed ? '' : this.toggle()}
          >
            <div className='logo' />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
              <Menu.Item key='1'>
                <Icon type='user' />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key='2'>
                <Icon type='video-camera' />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key='3'>
                <Icon type='upload' />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{background: '#fff', minHeight: 280, height: this.state.height - 80}}>
            Content {this.state.height}
          </Content>
        </Layout>
        <Footer style={{
          background: 'blue',
          padding: 0,
          height: 80
        }}>
          <Icon
            className='trigger'
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => this.toggle()}
          />
        </Footer>
      </Layout>
    )
  }
}

export default App
