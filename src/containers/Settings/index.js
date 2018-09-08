import React, { Component } from 'react'
import { Table, Button } from 'antd'

export default class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      loading: false
    }
  }

  render () {
    const { loading, selectedRowKeys } = this.state
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type='primary'
            onClick={() => console.log('hi')}
            loading={loading}
          >
            Reload
          </Button>
        </div>
        Settings
      </div>
    )
  }
}
