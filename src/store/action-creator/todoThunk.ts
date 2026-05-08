import axios from "axios"
import { TODO_ERROR, TODO_LOADING, TODO_SUCCESS, TODO_PAGE, type ActionType } from "../../types/todo"
import type { Dispatch } from "redux"


export const todoThunk = (page = 1, limit = 10) => {
  return async(dispatch: Dispatch<ActionType>) => {
    try {
      dispatch({type: TODO_LOADING})
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
        params: {
          _page: page,
          _limit: limit
        }
      })
      dispatch({type: TODO_SUCCESS, payload: response.data})
    } catch (e: unknown) {
      if(typeof(e) === 'string') {
        console.log(e)
      } else {
        dispatch({type: TODO_ERROR, payload: 'Произошла ошибка при загрузке пользователей'})
      }
    }
  }
}

export const setTodoPage = (page: number): ActionType => {
  return {type: TODO_PAGE, payload: page}
}