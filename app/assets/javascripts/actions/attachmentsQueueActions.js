import { createAction } from "redux-actions"
import {
  ADD_TO_QUEUE, REMOVE_FROM_QUEUE, CLEAN_QUEUE,
} from "../constants"
import * as attachmentActions from "./attachmentActions"

const add    = createAction(
  ADD_TO_QUEUE,
  attachment => attachment.id,
)

const remove = createAction(REMOVE_FROM_QUEUE)

export const cleanQueue = createAction(CLEAN_QUEUE)

export const addAttachment = attachment => (dispatch) => {
  dispatch(attachmentActions.add(attachment))
  dispatch(add(attachment))
}

export const removeAttachment = attachment => (dispatch) => {
  dispatch(remove(attachment))
  dispatch(attachmentActions.remove(attachment))
}
