import { combineReducers } from 'redux'

import articleReducer from "./article"
import articleFormReducer from './articleForm'

const rootReducer = combineReducers({
  articleReducer,
  articleFormReducer,
})

export default rootReducer