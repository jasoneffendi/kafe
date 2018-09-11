import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Column, Table, AutoSizer, defaultTableRowRenderer } from 'react-virtualized';
import 'react-virtualized/styles.css';


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
      <div style={{}}>
        <Table
          width={width}
          height={height}
          headerHeight={20}
          style={{fontFamily: 'helvetica neue', fontSize: 'small', color: 'white'}}
          rowHeight={20}
          rowCount={songs.length}
          rowGetter={({ index }) => songs[index]}
          rowRenderer={this.rowRenderer}
          // rowGetter={({ index }) => console.log(songs[index])}
          onRowDoubleClick={(props) => this.handleDoubleClick(props)}
        >
          <Column
            label='Name'
            dataKey='title'
            width={width/3}
          />
          <Column
            width={width/3}
            label='Album'
            dataKey='album'
          />
          <Column
            width={width/3}
            label='Artist'
            dataKey='artist'
          />
        </Table>
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