import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ImmutablePropTypes from "react-immutable-proptypes"
import FileUpload from "react-fileupload"

import { getUploaderApiOptions } from "../services/api"
import CommentItem from "./CommentItem"
import * as commentActions from "../actions/commentActions"
import * as fileUploaderActions from "../actions/fileUploaderActions"
import { getTask, getUploadProgress, getAttachmentsInQueue } from "../selectors"

@connect(
  (state, ownProps) => ({
    taskId:     ownProps.taskId.toString(),
    commentIds: getTask(state, { id: ownProps.taskId }).comments,
    progress:   getUploadProgress(state),
    queue:      getAttachmentsInQueue(state),
  }),
  dispatch => ({
    commentActions:  bindActionCreators(commentActions, dispatch),
    uploaderActions: bindActionCreators(fileUploaderActions, dispatch),
  }),
)
export default class CommentList extends Component {
  static propTypes = {
    taskId:          PropTypes.string.isRequired,
    commentIds:      ImmutablePropTypes.list.isRequired,
    progress:        PropTypes.number,
    queue:           ImmutablePropTypes.list.isRequired,
    commentActions:  PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    uploaderActions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  }

  constructor(props) {
    super(props)
    this.commentTextarea = null
    this.fileUploadOptions = {
      ...getUploaderApiOptions(),
      fileFieldName:   "file",
      chooseAndUpload: true,
      uploading:       props.uploaderActions.handleUploading,
      uploadSuccess:   props.uploaderActions.handleUploadSuccess,
      uploadError:     props.uploaderActions.handleUploadError,
      uploadFail:      props.uploaderActions.handleUploadFail,
    }
  }

  onRemoveFromQueue(attachment) {
    this.props.commentActions.removeFromQueue(attachment)
  }

  onAddComment() {
    const text = this.commentTextarea.value
    this.props.commentActions.createComment(text, this.props.taskId)
      .then(() => {
        this.commentTextarea.value = null
      })
  }

  render() {
    const { commentIds, taskId, progress, queue } = this.props

    return (
      <div className="comment-controller">
        { !commentIds.isEmpty() &&
          <div className="comments-list" >
            { commentIds.map(id =>
              <CommentItem id={id} key={id} taskId={taskId} />) }
          </div>
        }

        <div className="form-group">
          <textarea
            ref={(textarea) => { this.commentTextarea = textarea }}
            name="comment"
            rows="3"
            placeholder="Start typing here to write comment..."
            className="form-control" />
        </div>

        <button
          className="btn btn-success btn-sm pull-right"
          onClick={::this.onAddComment} >
          Submit comment
        </button>

        <FileUpload options={this.fileUploadOptions}>
          <button
            ref="chooseAndUpload"
            className="btn btn-primary btn-sm upload-file">
            Attach file
          </button>
        </FileUpload>

        { progress &&
          <div className="progress">
            <div className="progress-bar" role="progressbar"></div>
          </div>
        }

        { !queue.isEmpty() &&
          <ul className="attachments">
            {queue.map(attachment =>
              <li key={attachment.id}>
                <span className="glyphicon glyphicon-file" />
                <a href={attachment.file.url} target="_blank" rel="noopener noreferrer">
                  {attachment.file.name}
                </a>
                {attachment.file.size}
                <a onClick={() => ::this.onRemoveFromQueue(attachment)}>
                  <i className="glyphicon glyphicon-remove" />
                </a>
              </li>,
            )}
          </ul>
        }

      </div>
    )
  }
}
