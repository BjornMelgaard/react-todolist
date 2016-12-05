import api from "./api"

function create(text, taskId, attachmentIds) {
  return api.post("/comments", {
    comment:     { text, task_id: taskId },
    attachments: attachmentIds,
  })
}

function del(task) {
  return api.delete(`/comments/${task.id}`)
}

export default {
  create,
  delete: del,
}
