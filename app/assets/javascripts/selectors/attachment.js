import { createSelector } from "reselect"
import { getComment } from "./comment"
import { getQueue } from "./attachmentsQueue"

export const getAttachments = state => state.get("attachments")

export const getAttachment = (state, { id }) =>
  getAttachments(state).get(id && id.toString(), null)

export const makeGetCommentAttachments = () => createSelector(
  [getComment, getAttachments],
  (comment, attachments) =>
    comment.attachments.map(id => attachments.get(id.toString())),
)

export const getAttachmentsInQueue = createSelector(
  [getQueue, getAttachments],
  (queue, attachments) =>
    queue.map(id => attachments.get(id.toString())),
)
