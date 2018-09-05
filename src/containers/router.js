import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App/App'
import SongList from './SongList'

export default () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          component={SongList}
        />
      </Switch>
    </Router>
  )
}
