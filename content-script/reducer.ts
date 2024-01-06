import { type Action, type State } from "../types"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_NEAREST":
      console.log(
        `In reducer changing nearest from ${JSON.stringify(
          state.nearestSegment,
        )} to ${JSON.stringify(action.payload)}`,
      )
      return { ...state, nearestSegment: action.payload }
    case "SET_MUTED_SEGMENTS":
      return { ...state, mutedSegments: action.payload }
    case "SET_ENABLED":
      return { ...state, enabled: action.payload }
    case "SET_ERROR":
      return { ...state, backgroundScriptError: action.payload }
    default:
      return state
  }
}

export default reducer
