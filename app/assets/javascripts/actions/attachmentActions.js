import { createAction } from "redux-actions"
import {
  ADD_ATTACHMENT, REMOVE_ATTACHMENT,
} from "../constants"

export const add    = createAction(ADD_ATTACHMENT)
export const remove = createAction(REMOVE_ATTACHMENT)
