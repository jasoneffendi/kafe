import React, { Component } from 'react'
import { connect } from 'react-redux'
import songListAction from '../../redux/songList/actions'
import { Table, Button, Dropdown, Icon, Menu } from 'antd'

const { remote } = window.require('electron')
const fs = remote.require('fs')
const dialog = remote.dialog

const { openDialog } = songListAction

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

const expandedRowRender = record => <p>{record.description}</p>;

const columns = [{
  title: 'Title',
  dataIndex: 'title',
}, {
  title: 'Album',
  dataIndex: 'album',
}, {
  title: 'Artist',
  dataIndex: 'artist',
},
// {
//   title: 'Action',
//   dataIndex: 'operation',
//   key: 'operation',
//   render: () => (
//     <span className="table-operation">
//       <a href="javascript:;">Pause</a>
//       <a href="javascript:;">Stop</a>
//       <Dropdown overlay={menu}>
//         <a href="javascript:;">
//           More <Icon type="down" />
//         </a>
//       </Dropdown>
//     </span>
//   ),
// }
];

class SongList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      songs: [],
      loading: false
    }
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  openDialogWindow () {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, async (result) => {
      if (result === undefined) console.log('no results')
      console.log(result)
      this.props.openDialog(result[0])
      // let songs = walk(result[0])
    })
  }

  componentDidMount () {
    console.log('songlist did mount')
    console.log(this.props)
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps, 'props of songlist')
    const { songs } = nextProps
    this.setState({
      songs
    })
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => this.openDialogWindow()}
            // disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table 
        rowSelection={rowSelection}
        expandedRowRender={expandedRowRender}
        columns={columns}
        dataSource={this.state.songs}
        pagination={false}
        size={'small'}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    songs: state.songList.songs
  }),
  { openDialog }
)(SongList)