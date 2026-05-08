import { TODO_LOADING, TODO_SUCCESS, TODO_ERROR, TODO_PAGE } from '../../types/todo'
import type { ITodoState, ActionType } from '../../types/todo'


const initialState: ITodoState = {
  todo: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10
}

export const todoReducer = (state = initialState, action: ActionType): ITodoState => {
  switch(action.type) {
    case TODO_LOADING:
      return { ...state, loading: true,  }
    case TODO_SUCCESS:
      return { ...state, loading: false, todo: action.payload}
    case TODO_ERROR:
      return { ...state, loading: false, error: action.payload}
    case TODO_PAGE:
      return { ...state, page: action.payload }
    default:
      return state
  }
}
