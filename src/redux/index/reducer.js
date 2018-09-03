import actions from './actions'

const initState = {
}

export default function indexReducer (state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, idToken: action.token }
    default:
      return state
  }
}
