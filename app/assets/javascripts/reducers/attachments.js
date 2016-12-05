import { handleActions } from "redux-actions"
import Immutable from "immutable"

import {
  ADD_ATTACHMENT, REMOVE_ATTACHMENT,
  REMOVE_COMMENT,
} from "../constants"
import { Attachment } from "../schemas"

const initState = Immutable.Map()

export default handleActions({
  [ADD_ATTACHMENT]: (state, action) => {
    const key = action.payload.id.toString()
    const { id, file } = action.payload // filter attrs
    const record = new Attachment({ id, file })
    return state.set(key, record)
  },
  [REMOVE_ATTACHMENT]: (state, action) => {
    const key = action.payload.id.toString()
    return state.remove(key)
  },
  [REMOVE_COMMENT]: (state, action) => {
    const ids = action.payload.attachments.map(id => id.toString())
    return state.filterNot((val, key) => ids.includes(key))
  },
}, initState)
