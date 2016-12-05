import { is } from "immutable"
import fetchMock from "fetch-mock"

import * as taskActions from "#/actions/taskActions"
import { makeGetProjectTasks, getTask } from "#/selectors"
import mockStore from "../support/mockStore"

const getProjectTasks = makeGetProjectTasks()
const getProjectTasksAttribute = (state, projectId, attrName) =>
  getProjectTasks(state, { id: projectId }).map(task => task.get(attrName)).toArray()

describe("taskActions", () => {
  describe("createTask", () => {
    it("create new task asyncly", (done) => {
      const store = mockStore()
      const validTaskName = "some"
      const parentId = 1

      fetchMock.postOnce("*", { id: 99, name: validTaskName, position: 99 })

      store.dispatch(
        taskActions.createTask(validTaskName, parentId),
      ).then(() => {
        const state = store.getState()
        expect(getTask(state, { id: 99 }).name).toBe(validTaskName)
        const projectTasks = getProjectTasks(state, { id: 1 })
        expect(
          projectTasks.map(task => task.position).toArray(),
        ).toEqual([1, 2, 3, 99])
        expect(
          projectTasks.map(task => task.id).toArray(),
        ).toEqual([2, 3, 1, 99])
        done()
      })
    })
  })

  describe("sortTask", () => {
    it("when response is ok - sort task asyncly", (done) => {
      const store = mockStore()
      const taskId = 2
      const parentId = 1
      let state = store.getState()
      const oldTask = getTask(state, { id: taskId })
      const newTask = oldTask.set("position", oldTask.position + 1)

      expect(
        getProjectTasksAttribute(state, parentId, "id"),
      ).toEqual([2, 3, 1])

      fetchMock.putOnce("*", newTask.toJS())

      store.dispatch(
        taskActions.sortTask(oldTask, parentId, oldTask.position - 1, newTask.position - 1),
      ).then(() => {
        state = store.getState()

        expect(
          getProjectTasksAttribute(state, parentId, "id"),
        ).toEqual([3, 2, 1])

        done()
      })
    })
  })

  describe("removeTask", () => {
    it("when response is ok - remove task asyncly", (done) => {
      const store = mockStore()
      const taskId = 2
      const parentId = 1
      let state = store.getState()

      expect(
        getProjectTasksAttribute(state, parentId, "id"),
      ).toEqual([2, 3, 1])
      fetchMock.deleteOnce("*", {})

      store.dispatch(
        taskActions.removeTask({ id: taskId }, parentId),
      ).then(() => {
        state = store.getState()

        expect(
          getProjectTasksAttribute(state, parentId, "id"),
        ).toEqual([3, 1])

        done()
      })
    })
  })

  describe("doneTask", () => {
    it("mark task asyncly", (done) => {
      const store = mockStore()
      const taskId = 2
      let state = store.getState()

      expect(
        getTask(state, { id: taskId }).done,
      ).toBeFalsy()
      fetchMock.putOnce("*", {})

      store.dispatch(
        taskActions.doneTask({ id: taskId }, true),
      ).then(() => {
        state = store.getState()

        expect(
          getTask(state, { id: taskId }).done,
        ).toBeTruthy()

        done()
      })
    })
  })
})
