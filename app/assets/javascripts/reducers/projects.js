import { handleActions } from "redux-actions"
import Immutable from "immutable"

import {
  ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT,
  ADD_TASK, REMOVE_TASK,
} from "../constants"
import { Project } from "../schemas"

const initState = Immutable.Map()

function getProjectId(meta) {
  return meta.projectId && meta.projectId.toString()
}

export default handleActions({
  [ADD_PROJECT]: (state, action) => {
    const key = action.payload.id.toString()
    const emptyProject = new Project()
    const record = emptyProject.mergeDeep(action.payload)
    return state.set(key, record)
  },
  [UPDATE_PROJECT]: (state, action) => {
    const { id, ...props } = action.payload
    const key = id.toString()
    return state.update(key, record => record.mergeDeep(props))
  },
  [REMOVE_PROJECT]: (state, action) => {
    const key = action.payload.id.toString()
    return state.remove(key)
  },
  [ADD_TASK]: (state, action) => {
    const projectId = getProjectId(action.meta)
    if (!projectId) return state

    const taskId = Number(action.payload.id)
    return state.updateIn(
      [projectId, "tasks"],
      list => list.push(taskId),
    )
  },
  [REMOVE_TASK]: (state, action) => {
    const projectId = getProjectId(action.meta)
    if (!projectId) return state
    const taskId = Number(action.payload.id)

    return state.updateIn(
      [projectId, "tasks"],
      list => list.filterNot(value => value === taskId),
    )
  },
}, initState)
