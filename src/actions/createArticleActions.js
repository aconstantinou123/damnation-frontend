import {
  SAVE_ARTICLE_CONTENT,
  SAVE_ARTICLE_TITLE,
  SAVE_ARTICLE_AUTHOR,
  SAVE_ARTICLE_SUMMARY,
  SAVE_ARTICLE_IS_MAIN,
} from '../constants/types'

export const saveArticleContent = (payload) => ({
  type: SAVE_ARTICLE_CONTENT,
  payload
})

export const saveArticleTitle = (payload) => ({
  type: SAVE_ARTICLE_TITLE,
  payload
})

export const saveArticleAuthor = (payload) => ({
  type: SAVE_ARTICLE_AUTHOR,
  payload
})

export const saveArticleSummary = (payload) => ({
  type: SAVE_ARTICLE_SUMMARY,
  payload
})

export const saveArticleIsMain = (payload) => ({
  type: SAVE_ARTICLE_IS_MAIN,
  payload
})