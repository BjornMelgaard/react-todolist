import { createSelector } from "reselect"
import { getTask } from "./task"

export const getComments = state => state.get("comments")

export const getComment = (state, { id }) =>
  getComments(state).get(id && id.toString(), null)

export const makeGetProjectComments = () => createSelector(
  [getTask, getComments],
  (task, comments) =>
    task.comments.map(id => comments.get(id.toString())),
)
