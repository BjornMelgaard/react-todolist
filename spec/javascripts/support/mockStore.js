import { createStore, applyMiddleware } from "redux"
import thunkMiddleware                  from "redux-thunk"

import rootReducer from "#/reducers"
import { normalizeInitialState } from "#/normalizers"
import projects    from "./projectsSeed"

export default function mockStore(changes = {}) {
  let initialState = normalizeInitialState(projects)
  initialState = initialState.mergeDeep(changes)

  const middleware = [
    thunkMiddleware,
  ]

  return createStore(rootReducer, initialState, applyMiddleware(...middleware))
}
