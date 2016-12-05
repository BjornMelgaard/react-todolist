import { handleActions } from "redux-actions"
import Immutable from "immutable"

import {
  ADD_TASK, UPDATE_TASK, REMOVE_TASK,
  ADD_COMMENT, REMOVE_COMMENT,
} from "../constants"
import { Task } from "../schemas"

const initState = Immutable.Map()

function getTaskId(meta) {
  return meta.taskId && meta.taskId.toString()
}

export default handleActions({
  [ADD_TASK]: (state, action) => {
    const key = action.payload.id.toString()
    const emptyTask = new Task()
    const record = emptyTask.mergeDeep(action.payload)
    return state.set(key, record)
  },
  [UPDATE_TASK]: (state, action) => {
    const { id, ...props } = action.payload
    const key = id.toString()
    return state.update(key, record => record.mergeDeep(props))
  },
  [REMOVE_TASK]: (state, action) => {
    const key = action.payload.id.toString()
    return state.remove(key)
  },
  [ADD_COMMENT]: (state, action) => {
    const taskId = getTaskId(action.meta)
    if (!taskId) return state

    const commentId = Number(action.payload.id)
    return state.updateIn(
      [taskId, "comments"],
      list => list.push(commentId),
    )
  },
  [REMOVE_COMMENT]: (state, action) => {
    const taskId = getTaskId(action.meta)
    if (!taskId) return state
    const commentId = Number(action.payload.id)

    return state.updateIn(
      [taskId, "comments"],
      list => list.filterNot(value => value === commentId),
    )
  },
}, initState)
