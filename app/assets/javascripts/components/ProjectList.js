import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ImmutablePropTypes from "react-immutable-proptypes"

import ProjectItem         from "./ProjectItem"
import * as projectActions from "../actions/projectActions"
import { getProjects, isAnyProjectEditing } from "../selectors"

@connect(
  state => ({
    projects:   getProjects(state),
    anyEditing: isAnyProjectEditing(state),
  }),
  dispatch => ({ createProject: () => dispatch(projectActions.createProject()) }),
)
export default class ProjectList extends Component {
  static propTypes = {
    projects:      ImmutablePropTypes.map.isRequired,
    createProject: PropTypes.func.isRequired,
    anyEditing:    PropTypes.bool.isRequired,
  }

  onCreate() {
    this.props.createProject()
  }

  render() {
    const { projects, anyEditing } = this.props
    const projectIds = projects.keySeq()

    return (
      <div>
        <div className="projects">
          { projectIds.map(id =>
            <ProjectItem id={id} key={id} />) }
        </div>
        <div className="text-center">
          <button
            className="btn btn-lg btn-primary"
            disabled={anyEditing}
            onClick={::this.onCreate}
          >
            <span className="glyphicon glyphicon-plus" />Add TODO List
          </button>
        </div>
      </div>
    )
  }
}
