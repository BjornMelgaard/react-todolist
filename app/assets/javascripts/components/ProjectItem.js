import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ImmutablePropTypes from "react-immutable-proptypes"

import TaskList              from "./TaskList"
import * as projectActions   from "../actions/projectActions"
import { getProject, isProjectEditing } from "../selectors"

@connect(
  (state, ownProps) => ({
    project: getProject(state, ownProps),
    editing: isProjectEditing(state, ownProps),
  }),
  dispatch => ({ actions: bindActionCreators(projectActions, dispatch) }),
)
export default class ProjectItem extends Component {
  static propTypes = {
    project: ImmutablePropTypes.record.isRequired,
    editing: PropTypes.bool.isRequired,
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  }

  onCancel() {
    this.props.actions.cancelEdited()
  }

  onSave(event) {
    this.props.actions.saveEdited(event.target.value)
  }

  onEdit(project) {
    this.props.actions.editProject(project)
  }

  onDelete(project) {
    this.props.actions.removeProject(project)
  }

  render() {
    const { project, editing } = this.props
    const { id, name } = project

    return (
      <div className="project">
        <div className="project-header">
          <div className="project-field">
            {
              editing
                ? <input
                  type="text"
                  defaultValue={name}
                  autoFocus
                  onKeyUp={(event) => {
                    if (event.key === "Enter") { ::this.onSave(event) }
                    if (event.key === "Escape") { ::this.onCancel() }
                  }}
                  onBlur={::this.onSave}
                />
                : <h2>{name}</h2>
            }
          </div>

          <div className="control">
            <ul>
              <li><button className="edit"   onClick={_ => ::this.onEdit(project)} /></li>
              <li><button className="delete" onClick={_ => ::this.onDelete(project)} /></li>
            </ul>
          </div>
        </div>
        <TaskList projectId={id}></TaskList>
      </div>
    )
  }
}
