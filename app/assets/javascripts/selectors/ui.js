import { getProject } from "./project"
import { getTask } from "./task"

const getUiAttribute = (state, attr) => state.get("ui").get(attr)

// projects
export const getEditingProject = state =>
  getProject(state, { id: getUiAttribute(state, "editingProjectId") })

export const isProjectEditing = (state, { id }) =>
  getUiAttribute(state, "editingProjectId") == id

export const isAnyProjectEditing = state =>
  !!getUiAttribute(state, "editingProjectId")

// tasks
export const getEditingTask = state =>
  getTask(state, { id: getUiAttribute(state, "editingTaskId") })

export const isTaskEditing = (state, { id }) =>
  getUiAttribute(state, "editingTaskId") == id

export const isAnyTaskEditing = state =>
  !!getUiAttribute(state, "editingTaskId")
//
export const getSelectedTask = state =>
  getTask(state, { id: getUiAttribute(state, "selectedTaskId") })

export const isTaskSelected = (state, { id }) =>
  getUiAttribute(state, "selectedTaskId") == id

export const isAnyTaskSelected = state =>
  !!getUiAttribute(state, "selectedTaskId")

// comments

// upload
export const getUploadProgress = state =>
  getUiAttribute(state, "uploadProgress")
