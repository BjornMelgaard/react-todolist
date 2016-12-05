import api from "./api"

function create(project) {
  return api.post("/projects", project)
}

function update(project) {
  return api.put(`/projects/${project.id}`, project)
}

function del(project) {
  return api.delete(`/projects/${project.id}`)
}

export default {
  create,
  update,
  delete: del,
}
