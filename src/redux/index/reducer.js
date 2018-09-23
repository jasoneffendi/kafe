import actions from './actions'

const initState = {
  config: {},
  songs: {}
}

export default function indexReducer (state = initState, action) {
  switch (action.type) {
    case actions.LOAD_CONFIG:
      return { ...state, config: action.config }
    case actions.LOAD_SONGS:
      return { ...state, songs: action.songs }
    default:
      return state
  }
}
