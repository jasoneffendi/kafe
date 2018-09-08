import actions from './actions'

const initState = {
  songs: []
}

export default function songListReducer (state = initState, action) {
  switch (action.type) {
    case actions.LOAD_FILES:
      console.log(action)
      return { ...state, songs: action.data }
    default:
      return state
  }
}
