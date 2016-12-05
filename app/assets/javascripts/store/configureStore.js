import { createStore, applyMiddleware } from "redux"
import createLogger                     from "redux-logger"
import thunkMiddleware                  from "redux-thunk"

import rootReducer from "../reducers"
import { normalizeInitialState } from "../normalizers"

export default function configureStore(json) {
  const initialState = normalizeInitialState(json)

  const middleware = [
    thunkMiddleware,
  ]

  // if (window.config.env !== "production") middleware.push(createLogger())

  return createStore(rootReducer, initialState, applyMiddleware(...middleware))
}
