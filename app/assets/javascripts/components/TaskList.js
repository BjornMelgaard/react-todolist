import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ImmutablePropTypes from "react-immutable-proptypes"
import { SortableContainer, SortableElement } from "react-sortable-hoc"

import TaskItem from "./TaskItem"
import * as taskActions from "../actions/taskActions"
import { getProject } from "../selectors"
import { isProjectExist }     from "../helpers"

const SortableItem = SortableElement(params => <TaskItem {...params} />)

@connect(
  (state, ownProps) => ({
    projectId:     ownProps.projectId.toString(),
    taskIds:       getProject(state, { id: ownProps.projectId }).tasks,
    projectExists: isProjectExist({ id: ownProps.projectId }),
  }),
  dispatch => ({
    createTask: (...args) => dispatch(taskActions.createTask(...args)),
    sortTask:   (...args) => dispatch(taskActions.sortTask(...args)),
  }),
)
export default class TaskList extends Component {
  static propTypes = {
    taskIds:       ImmutablePropTypes.list.isRequired,
    projectExists: PropTypes.bool.isRequired,
    projectId:     PropTypes.string.isRequired,
    createTask:    PropTypes.func.isRequired,
    sortTask:      PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.createTaskInput = null
    this.SortableList = SortableContainer(({ taskIds }) => (
      <tbody>
        { taskIds.map((id, index) =>
          <SortableItem
            key={id}
            id={id}
            index={index}
            projectId={this.props.projectId}
          />)}
      </tbody>
    ))
  }

  onAdd() {
    const name = this.createTaskInput.value
    const projectId = this.props.projectId
    this.props.createTask(name, projectId).then(() => {
      this.createTaskInput.value = null
    })
  }

  onSortEnd({ oldIndex, newIndex }) {
    const id = this.props.taskIds.get(oldIndex)
    const projectId = this.props.projectId
    this.props.sortTask({ id }, projectId, oldIndex, newIndex)
  }

  render() {
    const { projectExists, taskIds } = this.props
    const SortableList = this.SortableList

    return (
      <div>
        { projectExists &&
          <div className="form-inline create-task-header">
            <div className="input-group create-task-in">
              <input
                type="text"
                className="form-control"
                ref={(input) => { this.createTaskInput = input }}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-success add-task"
                  onClick={::this.onAdd}
                >Add task</button>
              </span>
            </div>
          </div>
        }
        { !taskIds.isEmpty() &&
          <div className="task-list">
            <table className="tasks">
              <SortableList
                useDragHandle
                taskIds={taskIds}
                onSortEnd={::this.onSortEnd}
              />
            </table>
          </div>
        }
      </div>
    )
  }
}
