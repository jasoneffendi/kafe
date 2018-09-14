import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Column, Table, AutoSizer, defaultTableRowRenderer } from 'react-virtualized';
import { List as AntdList, Avatar } from 'antd'
import 'react-virtualized/styles.css';

const Item = AntdList.Item


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

  rowRenderer = (props) => {
    const { nowPlaying } = this.state
    let { style, rowData } = props
    console.log(props, 'props of row')
    // if (this.state)
    if (nowPlaying.key === rowData.key) {
      Object.assign(style, {backgroundColor: 'grey'})
    }
    console.log(style)
    console.log(props, 'props of row after assign')
    return (
      React.createElement(defaultTableRowRenderer, props)
  )}

  rowRenderer = ({
    index,       // Index of row
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    key,         // Unique key within array of rendered rows
    parent,      // Reference to the parent List (instance)
    style        // Style object to be applied to row (to position it);
                 // This must be passed through to the rendered row element.
  }) => {
    const { songs } = this.state
    const song = songs[index]
    const { title, album, artist } = song
  
    // If row content is complex, consider rendering a light-weight placeholder while scrolling.
    // const content = !isVisible
    //   ? '...'
    //   : 'string'
    return (
      <div
        className=''
        onDoubleClick={() => console.log(song)}
        key={key}
        style={{...style, color: 'white'}}
      >
        <Item>
          <Item.Meta
            title={<div className='song-title'>{title}</div>}
            description={<div className='song-description'>{`${artist} | ${album}`}</div>}
          />
        </Item>
      </div>
    )
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
          className=''
          width={width}
          height={height}
          rowCount={songs.length}
          rowHeight={64}
          rowRenderer={this.rowRenderer}
          overscanRowCount={5}
        />
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