import { combineReducers } from 'redux'

import articleReducer from "./article"
import articleFormReducer from './articleForm'
import userReducer from './user'
import archiveReducer from './archive'

const rootReducer = combineReducers({
  articleReducer,
  articleFormReducer,
  userReducer,
  archiveReducer,
})

export default rootReducer