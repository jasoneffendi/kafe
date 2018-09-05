import React from 'react'
import { Provider } from 'react-redux'
import KafeApp from './containers'
import { store } from './redux/store'

const App = () => (
  <Provider store={store}>
    <KafeApp />
  </Provider>
)

export default App
