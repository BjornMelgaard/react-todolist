import { createAction } from "redux-actions"
import {
  EDIT_PROJECT, EDIT_TASK, SELECT_TASK,
  SET_UPLOAD_PROGRESS,
} from "../constants"

export const editProject = createAction(
  EDIT_PROJECT,
  project => project.id,
)
export const uneditProject = createAction(
  EDIT_PROJECT,
  () => null,
)

export const editTask = createAction(
  EDIT_TASK,
  task => task.id,
)
export const uneditTask = createAction(
  EDIT_TASK,
  () => null,
)

export const selectTask = createAction(
  SELECT_TASK,
  task => task.id,
)
export const unselectTask = createAction(
  SELECT_TASK,
  () => null,
)

export const setUploadProgress = createAction(SET_UPLOAD_PROGRESS)
