import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import * as reducers from "./ducks"

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
