import { combineReducers } from "redux-immutable"
import { reducer as toastrReducer } from "react-redux-toastr"

import projects from "./projects"
import tasks    from "./tasks"
import comments from "./comments"
import attachments from "./attachments"
import attachmentsQueue from "./attachmentsQueue"
import ui       from "./ui"

export default combineReducers({
  projects,
  tasks,
  comments,
  attachments,
  attachmentsQueue,
  ui,
  toastr: toastrReducer,
})
