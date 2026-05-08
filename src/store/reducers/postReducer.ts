import { FETCH_ERROR, FETCH_PAGE, FETCH_POSTS, FETCH_SUCCESS, type ActionType, type IInitialState } from "../../types/post"

const initialState: IInitialState = {
  post: [],
  loading: false,
  error: null,
  page: 0,
  limit: 10,
  hasMore: true
} 

export const postReducer = (state = initialState, action: ActionType) => {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, loading: true }
    case FETCH_SUCCESS:
      return { ...state, loading: false, post: [...state.post,...action.payload], hasMore: action.payload.length === state.limit }
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }
    case FETCH_PAGE:
      return { ...state, page: action.payload }
    default: return state
  }
}