import { combineReducers } from 'redux'

import articleReducer from "./article"
import createArticleReducer from './createArticle'

const rootReducer = combineReducers({
  articleReducer,
  createArticleReducer,
})

export default rootReducer