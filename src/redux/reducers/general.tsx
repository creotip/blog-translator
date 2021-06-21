import { actionTypes, GeneralActionTypes } from '../actions/general'
import { Post } from '../../config/types'

export interface generalReducerProps {
  locale: string
  posts: Post[]
  translatedPosts: Post[]
}

export const initialState: generalReducerProps = {
  locale: '',
  posts: [],
  translatedPosts: [],
}

const generalReducer = (state = initialState, action: GeneralActionTypes) => {
  switch (action.type) {
    case actionTypes.SET_LOCALE:
      return {
        ...state,
        locale: action.payload,
      }

    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      }
    case actionTypes.SET_TRANSLATED_POSTS:
      return {
        ...state,
        translatedPosts: action.payload,
      }
    default:
      return state
  }
}

export default generalReducer
