import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SongList from './SongList'
import PlayList from './PlayList'
import Settings from './Settings'

export default class AppRouter extends Component {
  render () {
    const { url } = this.props
    return (
      <div>
        <Route
          exact
          path={`${url}`}
          component={SongList}
        />
        <Route
          path={`${url}/playlist`}
          component={PlayList}
        />
        <Route
          path={`${url}/settings`}
          component={Settings}
        />
      </div>
    )
  }
}
