import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ImmutablePropTypes from "react-immutable-proptypes"

import AttachmentList from "./AttachmentList"
import { getComment } from "../selectors"
import * as commentActions from "../actions/commentActions"

@connect(
  (state, ownProps) => ({
    taskId:  ownProps.taskId,
    comment: getComment(state, ownProps),
  }),
  dispatch => ({ actions: bindActionCreators(commentActions, dispatch) }),
)
export default class CommentItem extends Component {
  static propTypes = {
    comment: ImmutablePropTypes.record.isRequired,
    taskId:  PropTypes.string.isRequired,
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  }

  onDelete(comment) {
    this.props.actions.removeComment(comment, this.props.taskId)
  }

  render() {
    const { comment } = this.props
    const { text, attachments } = comment

    return (
      <div className="comment">
        <a className="comment-delete" onClick={_ => ::this.onDelete(comment)}>
          <span className="glyphicon glyphicon-remove"></span>
        </a>
        {text}
        { !attachments.isEmpty() &&
          <AttachmentList commentId={comment.id} />
        }
      </div>
    )
  }
}
