import { all, takeEvery, call, put, fork } from 'redux-saga/effects'
import { push } from 'react-router-redux'

export function * loginRequest () {
  yield takeEvery('LOGIN_REQUEST', function * (payload) {
    // let res = yield call(callApi.loginApi, payload)
    // if (res.token) {
    //   yield localStorage.setItem('id_token', res.token)
    //   yield put({type: actions.LOGIN_SUCCESS, token: res.token})
    // } else {
    //   yield put({ type: actions.LOGIN_ERROR })
    // }
  })
}

export default function * rootSaga () {
  yield all([
    fork(loginRequest)
  ])
}
