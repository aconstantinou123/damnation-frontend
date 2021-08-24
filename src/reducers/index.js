import { combineReducers } from 'redux'

import articleReducer from "./article"
import articleFormReducer from './articleForm'
import userReducer from './user'

const rootReducer = combineReducers({
  articleReducer,
  articleFormReducer,
  userReducer,
})

export default rootReducer