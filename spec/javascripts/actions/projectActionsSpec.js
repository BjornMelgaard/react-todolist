import { is } from "immutable"
import fetchMock from "fetch-mock"

import { Project } from "#/schemas"
import { NEW_PROJECT_ID } from "#/constants"

import * as projectActions from "#/actions/projectActions"
import { isProjectEditing, getProjects, getProject, getEditingProject } from "#/selectors"
import mockStore from "../support/mockStore"

describe("projectActions", () => {
  describe("createProject", () => {
    it("do nothing if some project is editing", () => {
      const store = mockStore({ ui: { editingProjectId: 1 } })
      const preState = store.getState()

      store.dispatch(projectActions.createProject())

      const postState = store.getState()
      const isEqual = is(preState, postState)
      expect(isEqual).toBe(true)
    })

    it("push project with 'new' id to end, set 'editingProjectId' to 'new'", () => {
      const store = mockStore()

      store.dispatch(projectActions.createProject())

      const state = store.getState()
      expect(getProjects(state).last().get("id")).toBe(NEW_PROJECT_ID)
      expect(isProjectEditing(state, { id: NEW_PROJECT_ID })).toBe(true)
    })
  })

  describe("cancelEdited", () => {
    it("unselect if selected project exists in DB", () => {
      const store = mockStore({ ui: { editingProjectId: 1 } })

      store.dispatch(projectActions.cancelEdited())

      const state = store.getState()
      expect(getEditingProject(state)).toBe(null)
    })

    it("unselect and remove 'new' project", () => {
      const store = mockStore({
        projects: { new: new Project({ id: NEW_PROJECT_ID, name: "some" }) },
        ui:       { editingProjectId: NEW_PROJECT_ID },
      })

      store.dispatch(projectActions.cancelEdited())

      const state = store.getState()
      expect(getProject(state, { id: NEW_PROJECT_ID })).toBe(null)
      expect(getEditingProject(state)).toBe(null)
    })
  })

  describe("saveEdited", () => {
    const validName   = "New Name"
    const invalidName = "        "
    let store

    describe("when project exists", () => {
      beforeEach(() => {
        store = mockStore({
          ui: { editingProjectId: 1 },
        })
      })

      describe("and name valid - ", () => {
        it("update it and remove selection", (done) => {
          fetchMock.putOnce("*", { id: 1, name: validName })

          store.dispatch(
            projectActions.saveEdited(validName),
          ).then(() => {
            const state = store.getState()
            expect(getProject(state, { id: 1 }).name).toBe(validName)
            expect(getEditingProject(state)).toBe(null)
            done()
          })
        })
      })
      describe("and name invalid - ", () => {
        it("do nothing", (done) => {
          const preState = store.getState()

          store.dispatch(
            projectActions.saveEdited(invalidName),
          ).then(() => {
            const postState = store.getState()
            const isEqual = is(preState, postState)
            expect(isEqual).toBe(true)
            done()
          })
        })
      })
    })
    describe("when project doesn`t exists", () => {
      beforeEach(() => {
        store = mockStore({
          ui:       { editingProjectId: NEW_PROJECT_ID },
          projects: { new: new Project({ id: NEW_PROJECT_ID, name: "some" }) },
        })
      })

      describe("and name valid - ", () => {
        it("create it, pop new project and remove selection", (done) => {
          fetchMock.postOnce("*", { id: 99, name: validName })

          store.dispatch(
            projectActions.saveEdited(validName),
          ).then(() => {
            const state = store.getState()
            expect(getProject(state, { id: 99 }).name).toBe(validName)
            expect(getProject(state, { id: NEW_PROJECT_ID })).toBe(null)
            expect(getEditingProject(state)).toBe(null)
            done()
          })
        })
      })
      describe("and name invalid - ", () => {
        it("pop new project and remove selection", (done) => {
          spyOn(window, "fetch")

          store.dispatch(
            projectActions.saveEdited(invalidName),
          ).then(() => {
            const state = store.getState()
            expect(window.fetch).not.toHaveBeenCalled()
            expect(getProject(state, { id: NEW_PROJECT_ID })).toBe(null)
            expect(getEditingProject(state)).toBe(null)
            done()
          })
        })
      })
    })
  })

  describe("removeProject", () => {
    it("do nothing if project dont exist", (done) => {
      const store = mockStore()
      const preState = store.getState()

      store.dispatch(
        projectActions.removeProject({ id: NEW_PROJECT_ID }),
      ).then(() => {
        const postState = store.getState()
        const isEqual = is(preState, postState)
        expect(isEqual).toBe(true)
        done()
      })
    })

    it("remove project from database and state", (done) => {
      const store = mockStore()
      fetchMock.deleteOnce("*", {})

      store.dispatch(
        projectActions.removeProject({ id: 1 }),
      ).then(() => {
        const state = store.getState()
        expect(getProject(state, { id: 1 })).toBe(null)
        done()
      })
    })
  })
})
