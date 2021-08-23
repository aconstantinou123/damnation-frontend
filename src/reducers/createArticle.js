import { SAVE_ARTICLE_CONTENT } from '../constants/types'

const defaultState = {
  articleContent: {}
}

const createArticleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_ARTICLE_CONTENT:
      return {
        ...state,
        articleContent: action.payload,
      }
    default:
      return state
  }
}

export default createArticleReducer