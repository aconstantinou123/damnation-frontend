import { combineReducers } from 'redux'

import articleReducer from "./article";

const rootReducer = combineReducers({
  articleReducer,
})

export default rootReducer