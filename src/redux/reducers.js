import { combineReducers } from 'redux'
import indexReducer from './index/reducer'

const allReducers = {
  indexReducer
}

export const rootReducer = combineReducers(allReducers)
