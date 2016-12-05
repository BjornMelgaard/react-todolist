import { normalize, arrayOf } from "normalizr-immutable"
import Immutable from "immutable"

import schemas from "./schemas"

export function normalizeInitialState(json) {
  const normalized = normalize(json, arrayOf(schemas.project), {
    useMapsForEntityObjects: true,
  })

  const emptyMap = Immutable.Map({
    projects:    Immutable.Map(),
    tasks:       Immutable.Map(),
    comments:    Immutable.Map(),
    attachments: Immutable.Map(),
  })
  let entities = emptyMap.merge(normalized.entities)

  // project.tasks must be sorted by 'position' attribute
  entities.get("projects").keySeq().forEach((projectId) => {
    entities = entities.updateIn(["projects", projectId, "tasks"], taskIds =>
      taskIds
        .map(id => id.toString())
        .map(id => entities.getIn(["tasks", id]))
        .sortBy(task => task.position)
        .map(task => task.id),
    )
  })

  // deadlines must be or null, or moment object
  entities.get("tasks").keySeq().forEach((taskId) => {
    entities = entities.updateIn(["tasks", taskId, "deadline"], deadline =>
      deadline && window.moment(deadline),
    )
  })

  return entities
}

export function normalizeProject(project) {
  return normalize(project, schemas.project).entities.projects
}

export function normalizeTask(task) {
  return normalize(task, schemas.task).entities.tasks
}
