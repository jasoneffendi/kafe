const actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  login: (payload) => ({
    type: actions.LOGIN_REQUEST,
    payload
  })
}
export default actions
