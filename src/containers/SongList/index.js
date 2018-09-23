import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, message, Avatar, Spin } from 'antd';
import { List as VList, WindowScroller, AutoSizer } from 'react-virtualized'
import 'react-virtualized/styles.css';

import durationFormatter from '../../helpers/durationFormatter'

class SongList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      songs: [],
      width: 0,
      height: 0,
      loading: false,
      nowPlaying: {}
    }
  }


  componentWillMount() {
    console.log(this.props, 'willmount props')
    // const { songs } = this.props
    // this.setState({
    //   songs
    // })
  }
  
  componentDidMount () {
    console.log('songlist did mount')
    console.log(this.props)
    const { songs, width, height } = this.props
    this.setState({
      songs,
      width,
      height
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps, 'props of songlist')
    const { songs, width, height } = nextProps
    this.setState({
      songs,
      width,
      height
    })
  }

  componentWillUnmount () {
    console.log('will unmount')
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  renderItem = ({ index, key, style }) => {
    const { songs } = this.state;
    const song = songs[index];
    const { title, album, artist, picture, duration } = song
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={picture.data} />}
          title={
          <div>
            <div className="title">{title}</div>
            <div className="duration">{durationFormatter(duration)}</div>
          </div>
          }
          description={
          <div>
            <div className="description">{`${artist} | ${album}`}</div>
            <div></div>
          </div>
          }
        />
      </List.Item>
    );
  }

  handleDoubleClick = ({event, index, rowData}) => {
    console.log('hey')
    this.setState({
      nowPlaying: rowData
    })
  }

  render() {
    const { songs, loading, height, width} = this.state;
    console.log(height, 'height of index')
    return (
      <div className='song-list' style={{}}>
      <List
      size="small"
      >
        <VList
          className=''
          width={width}
          height={height}
          rowCount={songs.length}
          rowHeight={45}
          rowRenderer={this.renderItem}
          overscanRowCount={5}
        />
      </List>
      </div>
    );
  }
}

export default connect(
  state => ({
    songs: state.songList.songs
  }),
  {}
)(SongList)