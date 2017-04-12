import React        from "react"
import PropTypes    from "prop-types"
import { Provider } from "react-redux"
import ReduxToastr  from "react-redux-toastr"

import ProjectList    from "./ProjectList"
import configureStore from "../store/configureStore"

function ProjectRoot({ projects }) {
  return (
    <Provider store={configureStore(JSON.parse(projects))}>
      <div>
        <ProjectList />
        <ReduxToastr />
      </div>
    </Provider>
  )
}

ProjectRoot.propTypes = {
  projects: PropTypes.string.isRequired,
}

export default ProjectRoot
