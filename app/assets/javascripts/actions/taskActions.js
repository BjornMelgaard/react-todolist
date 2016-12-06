import { createAction } from "redux-actions"
import { arrayMove } from "react-sortable-hoc"

import { ADD_TASK, UPDATE_TASK, REMOVE_TASK } from "../constants"
import { update as projectUpdate } from "./projectActions"
import taskService from "../services/taskService"
import { isTaskNameValid, handleError } from "../helpers"
import { getEditingTask, getProject, isTaskSelected } from "../selectors"
import { selectTask, unselectTask, uneditTask } from "./uiActions"

const add    = createAction(ADD_TASK,    task => task, (task, projectId) => ({ projectId }))
const remove = createAction(REMOVE_TASK, task => task, (task, projectId) => ({ projectId }))
const update = createAction(UPDATE_TASK)

export { editTask, uneditTask } from "./uiActions"

export const createTask = (name, projectId) => (dispatch) => {
  if (!isTaskNameValid(name)) return Promise.resolve()
  return taskService.create(name, projectId).then(
    resp => dispatch(add(resp, projectId)),
    handleError,
  )
}

export const sortTask = (task, projectId, oldIndex, newIndex) => (dispatch, getState) => {
  const state = getState()
  const owner = getProject(state, { id: projectId })

  const ownerTasks = owner.tasks.toArray()
  const newOwnerTasks = arrayMove(ownerTasks, oldIndex, newIndex)

  const delta = newIndex - oldIndex

  dispatch(projectUpdate({ id: projectId, tasks: newOwnerTasks }))

  return taskService.sort(task, delta)
    .catch(handleError)
}

export const removeTask = (task, projectId) => dispatch =>
  taskService.delete(task)
    .then(
      () => dispatch(remove(task, projectId)),
      handleError,
    )

export const doneTask = (task, done) => dispatch =>
  taskService.done(task, done)
    .then(
      () => dispatch(update({ id: task.id, done })),
      handleError,
    )

export const toggleSelection = task => (dispatch, getState) => {
  const selected = isTaskSelected(getState(), task)
  const method = selected ? unselectTask : selectTask
  dispatch(method(task))
}

export const saveEdited = newName => (dispatch, getState) => {
  const edited = getEditingTask(getState())
  const name = newName.replace(/(?:\r\n|\r|\n)/g, "") // remove newlines
  const newTask = { id: edited.id, name }
  return !edited
    ? Promise.resolve()
    : taskService
        .update(newTask)
        .then(() => {
          dispatch(update(newTask))
          dispatch(uneditTask(newTask))
        }, handleError)
}

export const setDeadline = (task, deadline) => (dispatch) => {
  if (deadline !== null && !window.moment.isMoment(deadline)) {
    throw { message: "Deadline is not valid (must be moment object or null)", deadline }
  }
  const id = task.id
  return taskService.update({ id, deadline: deadline && deadline.format() })
    .then(() => {
      dispatch(update({ id, deadline }))
    }, handleError)
}
