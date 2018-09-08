import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import KafeApp from './containers'

export default () => {
  return (
    <Router>
      <Switch>
        <Route
          path='/'
          component={KafeApp}
        />
      </Switch>
    </Router>
  )
}
