import { Post } from '../../config/types'

export const actionTypes = {
  SET_LOCALE: 'SET_LOCALE',
  SET_POSTS: 'SET_POSTS',
  SET_TRANSLATED_POSTS: 'SET_TRANSLATED_POSTS',
}

interface SetLocaleAction {
  type: typeof actionTypes.SET_LOCALE
  payload: string
}

interface SetActionPosts {
  type: typeof actionTypes.SET_POSTS
  payload: Post[]
}

interface SetActionTranslatedPosts {
  type: typeof actionTypes.SET_POSTS
  payload: Post[]
}

export type GeneralActionTypes = SetActionPosts | SetLocaleAction | SetActionTranslatedPosts
