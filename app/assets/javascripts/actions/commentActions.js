import { createAction } from "redux-actions"

import { ADD_COMMENT, REMOVE_COMMENT } from "../constants"
import * as queueActions from "./attachmentsQueueActions"
import { getQueue } from "../selectors"
import { isCommentTextValid, handleError } from "../helpers"
import commentService from "../services/commentService"

const add    = createAction(ADD_COMMENT,    comment => comment, (comment, taskId) => ({ taskId }))
const remove = createAction(REMOVE_COMMENT, comment => comment, (comment, taskId) => ({ taskId }))

export { removeAttachment as removeFromQueue } from "./attachmentsQueueActions"

export const createComment = (text, taskId) => (dispatch, getState) => {
  if (!isCommentTextValid(text)) return Promise.resolve()
  const state = getState()
  const queue = getQueue(state)
  return commentService.create(text, taskId, queue.toArray())
    .then((resp) => {
      const { id } = resp
      const newComment = { id, text, attachments: queue }
      dispatch(add(newComment, taskId))
      dispatch(queueActions.cleanQueue())
    }, handleError)
}

export const removeComment = (comment, taskId) => dispatch =>
  commentService.delete(comment)
    .then(
      () => dispatch(remove(comment, taskId)),
      handleError,
    )

