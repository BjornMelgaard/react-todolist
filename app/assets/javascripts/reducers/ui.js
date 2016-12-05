import Immutable from "immutable"
import { handleActions } from "redux-actions"

import {
  EDIT_PROJECT, EDIT_TASK, SELECT_TASK,
  SET_UPLOAD_PROGRESS,
} from "../constants"

const initState = Immutable.Map({
  editedProjectId: null,
  editedTaskId:    null,
  selectedTaskId:  null,
  uploadProgress:  null,
})

export default handleActions({
  [EDIT_PROJECT]: (state, action) => state.set("editingProjectId", action.payload),
  [EDIT_TASK]:    (state, action) => state.set("editingTaskId",    action.payload),
  [SELECT_TASK]:  (state, action) => state.set("selectedTaskId",   action.payload),
  [SET_UPLOAD_PROGRESS]: (state, action) => state.set("uploadProgress", action.payload),
}, initState)
