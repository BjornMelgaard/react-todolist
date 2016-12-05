import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ImmutablePropTypes from "react-immutable-proptypes"
import { SortableHandle } from "react-sortable-hoc"

import * as taskActions from "../actions/taskActions"
import { getTask, isTaskSelected, isTaskEditing } from "../selectors"
import CommentList from "./CommentList"
import DeadlinePicker from "../containers/DeadlinePicker"

const DragHandle = SortableHandle(() => <button className="sort" />)

@connect(
  (state, ownProps) => ({
    projectId: ownProps.projectId.toString(),
    task:      getTask(state, ownProps),
    selected:  isTaskSelected(state, ownProps),
    editing:   isTaskEditing(state, ownProps),
  }),
  dispatch => ({ actions: bindActionCreators(taskActions, dispatch) }),
)
export default class TaskItem extends Component {
  static propTypes = {
    task:      ImmutablePropTypes.record.isRequired,
    projectId: PropTypes.string.isRequired,
    selected:  PropTypes.bool.isRequired,
    editing:   PropTypes.bool.isRequired,
    actions:   PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  }

  onEdit(task) {
    this.props.actions.editTask(task)
  }

  onToggleSelect(task) {
    this.props.actions.toggleSelection(task)
  }

  onDelete(task) {
    this.props.actions.removeTask(task, this.props.projectId)
  }

  onDone(event) {
    const done = event.target.checked

    this.props.actions.doneTask(this.props.task, done)
  }

  onSave(event) {
    this.props.actions.saveEdited(event.target.value)
  }

  onCancel() {
    this.props.actions.uneditTask(this.props.task)
  }

  onSetDeadline(task, deadline) {
    this.props.actions.setDeadline(task, deadline)
  }

  render() {
    const { task, selected, editing } = this.props
    const { name } = task
    const done = task.done || false // to make new components controlled, warning otherwise, more info https://facebook.github.io/react/docs/forms.html#controlled-components
    const deadline = task.deadline

    return (
      <tr className="task-item">
        <td className="task-status">
          <input type="checkbox" name="status" checked={done} onChange={::this.onDone} />
        </td>

        <td className="task-name" >
          <div className="left-border">
            { editing
                ? <textarea
                    className="task-name-field" name="name" rows="1"
                    defaultValue={name}
                    autoFocus
                    onKeyUp={(event) => {
                      if (event.key === "Enter") { ::this.onSave(event) }
                      if (event.key === "Escape") { ::this.onCancel() }
                    }}
                    onBlur={::this.onSave} />
                : (
                  <div
                    className={`task-name-text ${done ? "task-done" : ""}`}
                    onClick={_ => ::this.onToggleSelect(task)} >
                    { deadline &&
                        <span className="label label-danger deadline">
                          {deadline.format("dddd, MMMM Do YYYY")}
                        </span>}
                    {name}
                  </div>
                  )}
            { selected &&
              <div className="task-body">
                <DeadlinePicker
                  deadline={deadline}
                  onChange={d => ::this.onSetDeadline(task, d)} />
                <CommentList taskId={task.id} />
              </div>
            }
          </div>
        </td>

        <td className="task-control">
          <div className="control">
            <ul>
              <li><DragHandle /></li>
              <li><button className="edit" onClick={_ => ::this.onEdit(task)} /></li>
              <li><button className="delete" onClick={_ => ::this.onDelete(task)} /></li>
            </ul>
          </div>
        </td>
      </tr>
    )
  }
}
