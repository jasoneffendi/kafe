import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './containers/index'

export default () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          component={Index}
        />
      </Switch>
    </Router>
  )
}
