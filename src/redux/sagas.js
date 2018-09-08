import { all } from 'redux-saga/effects'
import indexSaga from './index/saga'
import songListSaga from './songList/saga'

export function * rootSaga () {
  yield all([
    indexSaga(),
    songListSaga()
  ])
}
