import React from 'react'
import { Provider } from 'react-redux'
// import { BrowserRouter as Router } from 'react-router-dom'
import KafeApp from './containers'
import { store } from './redux/store'
import RootRouter from './router'

const App = () => (
  <Provider store={store}>
    <RootRouter />
  </Provider>
)

export default App
