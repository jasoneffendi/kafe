import { all } from 'redux-saga/effects'
import indexSaga from './index/saga'

export function * rootSaga () {
  yield all([
    indexSaga()
  ])
}
