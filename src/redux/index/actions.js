const actions = {
  GET_CONFIG: 'GET_CONFIG',
  LOAD_CONFIG: 'LOAD_CONFIG',
  GET_SONGS: 'GET_SONGS',
  LOAD_SONGS: 'LOAD_SONGS',
  UPDATE_CONFIG: 'LOGIN_SUCCESS',
  getConfig: (payload) => ({
    type: actions.GET_CONFIG,
    payload
  }),
  updateConfig: (payload) => ({
    type: actions.UPDATE_CONFIG,
    payload
  }),
  getSongs: (payload) => ({
    type: actions.GET_SONGS,
    payload
  })
}
export default actions
