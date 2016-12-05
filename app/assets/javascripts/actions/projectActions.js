import { createAction } from "redux-actions"

import projectService from "../services/projectService"
import { ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT, NEW_PROJECT_ID } from "../constants"
import { isAnyProjectEditing, getEditingProject } from "../selectors"
import { isProjectExist, isProjectNameValid, handleError } from "../helpers"
import { editProject, uneditProject } from "./uiActions"

// ************************************************************
// reducer can take objects or records,
// but they must be normalized in hight-level actions - thunks
// ************************************************************
export const add    = createAction(ADD_PROJECT)
export const update = createAction(UPDATE_PROJECT)
export const remove = createAction(REMOVE_PROJECT)

export { editProject } from "./uiActions"

export const createProject = () => (dispatch, getState) => {
  const state = getState()
  const selected = isAnyProjectEditing(state)
  if (selected) return

  const newProject = { id: NEW_PROJECT_ID }
  dispatch(add(newProject))
  dispatch(editProject(newProject))
}

export const cancelEdited = () => (dispatch, getState) => {
  const state = getState()
  const selected = getEditingProject(state)
  dispatch(uneditProject())
  if (!isProjectExist(selected)) dispatch(remove(selected))
}

export const saveEdited = newName => (dispatch, getState) => {
  const selected = getEditingProject(getState())
  const exists   = isProjectExist(selected)
  const valid    = isProjectNameValid(newName)

  if (!valid) {
    return exists
      ? Promise.resolve()
      : Promise.resolve().then(() => {
        dispatch(uneditProject())
        dispatch(remove(selected))
      }, handleError)
  }

  const project   = {
    id:   exists ? selected.id : null,
    name: newName,
  }

  return exists
    ? projectService.update(project)
      .then(() => {
        dispatch(uneditProject())
        dispatch(update(project))
      }, handleError)
    : projectService.create(project)
      .then((resp) => {
        dispatch(uneditProject())
        dispatch(remove(selected))
        dispatch(add(resp))
      }, handleError)
}

export const removeProject = project => (dispatch) => {
  if (!isProjectExist(project)) return Promise.resolve()
  return projectService.delete(project)
    .then(
      () => dispatch(remove(project)),
      handleError,
    )
}
