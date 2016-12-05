import { toastr } from "react-redux-toastr"
import { setUploadProgress } from "./uiActions"
import * as queueActions from "./attachmentsQueueActions"

export const handleUploading = progress => (dispatch) => {
  let percentage = progress.loaded / progress.total
  if (percentage > 100) percentage = 100
  if (percentage < 0)   percentage = 0
  dispatch(setUploadProgress(percentage))
}

export const handleUploadSuccess = resp => (dispatch) => {
  dispatch(setUploadProgress(null))
  dispatch(queueActions.addAttachment(resp))
}

export const handleUploadError = err => () => {
  console.error(err)
  toastr.error(err.message)
}

export const handleUploadFail = resp => () => {
  console.error(resp)
}
