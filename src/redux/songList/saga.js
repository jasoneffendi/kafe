import { all, takeEvery, call, put, fork } from 'redux-saga/effects'
import actions from './actions'
import walk from '../../helpers/walk'

export function * loadFiles () {
  yield takeEvery(actions.OPEN_DIALOG, function * ({payload}) {
    // TODO: make this an async function
    console.log(payload, 'action')
    // console.log(yield walk(payload))
    let songs = []
    try {
      songs = yield walk(payload)
    } catch (err) {
      console.log(err)
    }
    yield put({type: actions.LOAD_FILES, data: songs})
  })
}

export default function * rootSaga () {
  yield all([
    fork(loadFiles)
  ])
}
