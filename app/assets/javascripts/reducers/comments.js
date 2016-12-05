import { handleActions } from "redux-actions"
import Immutable from "immutable"
import { Comment } from "../schemas"

import { ADD_COMMENT, REMOVE_COMMENT } from "../constants"

const initState = Immutable.Map()

export default handleActions({
  [ADD_COMMENT]: (state, action) => {
    const key = action.payload.id.toString()
    const emptyComment = new Comment()
    const record = emptyComment.mergeDeep(action.payload)
    return state.set(key, record)
  },
  [REMOVE_COMMENT]: (state, action) => {
    const key = action.payload.id.toString()
    return state.remove(key)
  },
}, initState)
