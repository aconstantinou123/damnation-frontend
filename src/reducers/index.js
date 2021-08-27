import { combineReducers } from 'redux'

import articleReducer from "./article"
import articleFormReducer from './articleForm'
import userReducer from './user'
import archiveReducer from './archive'
import contentReducer from './content'

const rootReducer = combineReducers({
  articleReducer,
  articleFormReducer,
  userReducer,
  archiveReducer,
  contentReducer,
})

export default rootReducer