import { createSelector } from "reselect"

export const getProjects = state => state.get("projects")

export const getProject = (state, { id }) =>
  getProjects(state).get(id && id.toString(), null)
