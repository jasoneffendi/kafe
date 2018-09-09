import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SongList from './SongList'
import PlayList from './PlayList'
import Settings from './Settings'

export default class AppRouter extends Component {
  render () {
    const { url, height, width } = this.props
    return (
      <div>
        <Route
          exact
          path={`${url}`}
          render={(props) => (<SongList width={width} height={height} />)}
        />
        <Route
          path={`${url}/playlist`}
          render={(props) => (<PlayList width={width} height={height} />)}
        />
        <Route
          path={`${url}/settings`}
          render={(props) => (<Settings width={width} height={height} />)}
        />
      </div>
    )
  }
}
