import { toastr } from "react-redux-toastr"
import { NEW_PROJECT_ID } from "./constants"

export const isProjectExist = ({ id }) =>
  !!id && id !== NEW_PROJECT_ID

export const isProjectNameValid = name =>
  !!name && name.trim() !== ""

export const isTaskNameValid = name =>
  !!name && name.trim() !== ""

export const isCommentTextValid = text =>
  !!text && text.trim() !== ""

export const handleError = (error) => {
  // eslint-disable-next-line no-console
  console.warn(error)
  error.response.json().then((json) => {
    const errors = json.errors
    const messages = []

    Object.entries(errors).forEach(([entity, explanations]) => {
      const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1)

      explanations.forEach((explanation) => {
        messages.push(`${capitalized} ${explanation}`)
      })
    })
    toastr.error(messages.join("; "))
  })
  return Promise.reject(error)
}
