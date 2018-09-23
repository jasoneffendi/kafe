import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const { Sider } = Layout

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const { url } = this.props
    console.log(this.props)
    return (
      <Sider
        className='darken'
        trigger={null}
        // collapsible
        // collapsed={this.state.collapsed}
        onMouseEnter={() => this.state.collapsed ? this.toggle() : ''}
        onMouseLeave={() => this.state.collapsed ? '' : this.toggle()}
      >
        {/* <div className='isoLogoWrapper'>
          <h2 style={{color: 'white', textAlign: 'center'}}>Kafe</h2>
        </div> */}
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>
            <Link to={`${url}`}>
              <Icon type='user' />
              <span>Songs</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to={`${url}/playlist`}>
              <Icon type='upload' />
              <span>Playlist</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to={`${url}/settings`}>
              <Icon type='upload' />
              <span>Settings</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default Sidebar
