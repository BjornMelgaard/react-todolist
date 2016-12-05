import { createSelector } from "reselect"
import { getProject } from "./project"

export const getTasks = state => state.get("tasks")

export const getTask = (state, { id }) =>
  getTasks(state).get(id && id.toString(), null)

export const makeGetProjectTasks = () => createSelector(
  [getProject, getTasks],
  (project, tasks) =>
    project.tasks.map(id => tasks.get(id.toString())),
)
