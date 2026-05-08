import  type { IInitialState, typeAction } from "../../types/comments"
import { COMMENTS_LOADING, COMMENTS_ERROR, COMMENTS_SUCCESS } from "../../types/comments"

const initialState: IInitialState = {
  loading: false,
  comments: [],
  error: null,
}

export const CommentsReducer = (state: IInitialState = initialState, action: typeAction) => {
  switch(action.type) {
    case COMMENTS_LOADING:
      return { ...state, loading: true }
    case COMMENTS_SUCCESS:
      return { ...state, comments: action.payload, loading: false }
    case COMMENTS_ERROR:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}