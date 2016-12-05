import { Record, List } from "immutable"
import { Schema, arrayOf } from "normalizr-immutable"

export const Attachment = new Record({
  id:   null,
  file: null,
})

export const Comment = new Record({
  id:          null,
  text:        null,
  attachments: new List(),
})

export const Task = new Record({
  id:       null,
  name:     null,
  done:     null,
  deadline: null,
  position: null,
  comments: new List(),
})

export const Project = new Record({
  id:    null,
  name:  null,
  tasks: new List(),
})

const schemas = {
  project:    new Schema("projects", Project),
  task:       new Schema("tasks", Task),
  comment:    new Schema("comments", Comment),
  attachment: new Schema("attachments", Attachment),
}

schemas.project.define({ tasks: arrayOf(schemas.task) })
schemas.task.define({ comments: arrayOf(schemas.comment) })
schemas.comment.define({ attachments: arrayOf(schemas.attachment) })

export default schemas
