import api from "./api"

function create(name, projectId) {
  return api.post("/tasks", {
    name,
    project_id: projectId,
  })
}

function update(task) {
  return api.put(`/tasks/${task.id}`, task)
}

function del(task) {
  return api.delete(`/tasks/${task.id}`)
}

function done(task, bool) {
  return api
    .put(`/tasks/${task.id}/done`, { task: { done: bool } })
}

function sort(task, delta) {
  return api
    .put(`/tasks/${task.id}/sort`, { task: { delta } })
}

function deadline(task, date) {
  return api
    .put(`/tasks/${task.id}/deadline`, { task: { deadline: date } })
}

export default {
  create,
  update,
  delete: del,
  done,
  sort,
  deadline,
}
