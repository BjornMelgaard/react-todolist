import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ImmutablePropTypes from "react-immutable-proptypes"

import { makeGetCommentAttachments } from "../selectors"

const makeMapStateToProps = () => {
  const getCommentAttachments = makeGetCommentAttachments()
  return (state, ownProps) => ({
    commentId:   ownProps.commentId.toString(),
    attachments: getCommentAttachments(state, { id: ownProps.commentId }),
  })
}

@connect(makeMapStateToProps)
export default class AttachmentList extends Component {
  static propTypes = {
    commentId:   PropTypes.string.isRequired,
    attachments: ImmutablePropTypes.list.isRequired,
  }

  render() {
    const { attachments } = this.props

    return (
      <ul className="attachments">
        { attachments.map(attachment => (
            <li key={attachment.id}>
              <span className="glyphicon glyphicon-file"></span>
              <a
                href={attachment.file.url}
                rel="noopener noreferrer"
                target="_blank" >
                {attachment.file.name}
              </a>
              ({attachment.file.size})
            </li>
          ))
        }
      </ul>
    )
  }
}
