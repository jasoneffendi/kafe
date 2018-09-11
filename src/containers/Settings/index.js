import React, { Component } from 'react'
import { connect } from 'react-redux'
import songListAction from '../../redux/songList/actions'
import { Table, Button } from 'antd'

const { remote } = window.require('electron')
const dialog = remote.dialog

const { openDialog } = songListAction

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      loading: false
    }
  }

  openDialogWindow () {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (result) => {
      if (result === undefined) return
      this.props.openDialog(result[0])
      // let songs = walk(result[0])
    })
  }

  render () {
    const { loading, selectedRowKeys } = this.state
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type='primary'
            onClick={() => this.openDialogWindow()}
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

export default connect(
  state => ({
    songs: state.songList.songs
  }),
  { openDialog }
)(Settings)
