import { is } from "immutable"
import fetchMock from "fetch-mock"

import * as commentActions from "#/actions/commentActions"
import * as queueActions from "#/actions/attachmentsQueueActions"
import { getTask, getComment, getQueue, makeGetCommentAttachments, getAttachment } from "#/selectors"
import mockStore from "../support/mockStore"

const getCommentAttachments = makeGetCommentAttachments()
const mockSingleFileUploadSuccessResponce = () => ({
  id:   10,
  file: {
    url:  "/uploads/attachment/file/10/h3LbqNw2Eos.jpg",
    name: "h3LbqNw2Eos.jpg",
    size: 140801,
  },
})

describe("commentActions", () => {
  describe("createComment", () => {
    it("create new comment with files from uploader queue asyncly", (done) => {
      const store = mockStore()
      const validCommentText = "some"
      const parentId = 1
      const attachment = mockSingleFileUploadSuccessResponce()

      store.dispatch(queueActions.addAttachment(attachment))

      let state = store.getState()
      let queue = getQueue(state)
      expect(queue.toArray()).toEqual([10])

      expect(getAttachment(state, { id: 10 }).id).toEqual(10)

      fetchMock.postOnce("*", { id: 99, text: validCommentText })

      store.dispatch(
        commentActions.createComment(validCommentText, parentId),
      ).then(() => {
        state = store.getState()

        const comment = getComment(state, { id: 99 })
        expect(comment.text).toBe(validCommentText)
        expect(comment.attachments.toArray()).toEqual([10])

        const parent = getTask(state, { id: parentId })
        expect(parent.comments.toArray()).toEqual([1, 2, 99])

        const attachments = getCommentAttachments(state, { id: 99 })
        expect(attachments.get(0).id).toEqual(10)

        queue = getQueue(state)
        expect(queue.isEmpty()).toEqual(true)

        done()
      })
    })
  })

  describe("removeComment", () => {
    it("when response is ok - remove comment asyncly", (done) => {
      const store = mockStore()
      let state = store.getState()
      const comment = getComment(state, { id: 1 })
      const parentId = 1
      let parent = getTask(state, { id: parentId })
      expect(parent.comments.toArray()).toEqual([1, 2])

      fetchMock.deleteOnce("*", {})

      store.dispatch(
        commentActions.removeComment(comment, parentId), // TODO provide actual entities EVERIVERE
      ).then(() => {
        state = store.getState()
        parent = getTask(state, { id: parentId })

        expect(parent.comments.toArray()).toEqual([2])

        expect(getAttachment(state, { id: 1 })).toEqual(null)
        expect(getAttachment(state, { id: 2 })).toEqual(null)
        done()
      })
    })
  })
})
