import * as selectors from "#/selectors"
import mockStore from "../support/mockStore"

describe("selectors", () => {
  let state

  beforeEach(() => {
    state = mockStore().getState()
  })

  it("getProjects", () => {
    const output = selectors.getProjects(state)
    expect(output.keySeq().toArray()).toEqual(["1", "2", "3"])
  })

  it("getTasks", () => {
    const output = selectors.getTasks(state)
    expect(output.keySeq().toArray()).toEqual(["1", "2", "3", "5"])
  })

  it("getProject", () => {
    const output = selectors.getProject(state, { id: 1 })
    expect(output.get("id")).toEqual(1)
  })

  it("makeGetProjectTasks returns tasks, sorted by project.tasks, wich is sorted by position", () => {
    const project = selectors.getProject(state, { id: 1 })
    expect(project.get("tasks").toArray()).toEqual([2, 3, 1])

    const getProjectTasks = selectors.makeGetProjectTasks()
    const output = getProjectTasks(state, { id: 1 })

    expect(output.map(task => task.position).toArray()).toEqual([1, 2, 3])
    expect(output.map(task => task.id).toArray()).toEqual([2, 3, 1])
    const position = 3
    expect(output.find(
      task => task.position === position,
    ).position).toEqual(position)
  })

  it("isProjectEditing", () => {
    let output = selectors.isProjectEditing(state, { id: 1 })
    expect(output).toEqual(false)

    state = state.setIn(["ui", "editingProjectId"], 1)
    output = selectors.isProjectEditing(state, { id: "1" })
    expect(output).toEqual(true)
  })

  it("isAnyProjectEditing", () => {
    let output = selectors.isAnyProjectEditing(state)
    expect(output).toEqual(false)

    state = state.setIn(["ui", "editingProjectId"], 1)
    output = selectors.isAnyProjectEditing(state)
    expect(output).toEqual(true)
  })

  it("getEditingProject", () => {
    let output = selectors.getEditingProject(state)
    expect(output).toEqual(null)

    state = state.setIn(["ui", "editingProjectId"], 1)
    output = selectors.getEditingProject(state)
    expect(output.get("id")).toEqual(1)
  })
})

