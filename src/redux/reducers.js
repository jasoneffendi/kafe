import { combineReducers } from 'redux'
import index from './index/reducer'
import songList from './songList/reducer'

const allReducers = {
  index,
  songList
}

export const rootReducer = combineReducers(allReducers)
