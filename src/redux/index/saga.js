import { all, takeEvery, call, put, fork } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import path from 'path'
import actions from './actions'

const { remote } = window.require('electron')
const { app } = remote

export function * getConfig () {
  yield takeEvery(actions.GET_CONFIG, function * (payload) {
    console.log(payload)
    const userDataPath = app.getPath('userData')
    const userConfigPath = path.join(userDataPath, 'kafeConfig.json')
    console.log(userConfigPath)
    // yield put({ type: actions.LOAD_CONFIG, config: {test: userConfigPath} })
  })
}

export function * getSongs () {
  yield takeEvery(actions.GET_SONGS, function * (payload) {
    yield put({ type: actions.LOAD_SONGS })
  })
}

export default function * rootSaga () {
  yield all([
    fork(getConfig),
    fork(getSongs)
  ])
}
