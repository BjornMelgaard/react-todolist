import fetchMock from "fetch-mock"

import projectService from "#/services/projectService"

describe("projectService", () => {
  it("create", (done) => {
    fetchMock.postOnce("*", { id: 99, name: "name" })

    projectService
      .create({ name: "name" })
      .then((res) => {
        expect(res.id).toEqual(99)
        done()
      })
  })
})
