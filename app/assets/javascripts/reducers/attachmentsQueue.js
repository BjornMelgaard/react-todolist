//
// the queue of unconfirmed attachment ids of selected task
//
import Immutable from "immutable"
import { handleActions } from "redux-actions"

import {
  ADD_TO_QUEUE, REMOVE_FROM_QUEUE, CLEAN_QUEUE,
} from "../constants"

const initState = Immutable.List()

export default handleActions({
  [ADD_TO_QUEUE]: (state, action) =>
    state.push(action.payload),
  [REMOVE_FROM_QUEUE]: (state, action) => {
    const key = state.indexOf(action.payload)
    return state.delete(key)
  },
  [CLEAN_QUEUE]: (state, action) =>
    Immutable.List(),
}, initState)
