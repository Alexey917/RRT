import type { Dispatch } from "redux"
import { FETCH_ERROR, FETCH_PAGE, FETCH_POSTS, FETCH_SUCCESS, type ActionType } from "../../types/post"
import axios from "axios"

export const postThunk = (page: number, limit: number) => {
  return async (dispatch: Dispatch<ActionType>) => {
    try {
      dispatch({type: FETCH_POSTS})
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page,
          _limit: limit
        }
      })
      dispatch({type: FETCH_SUCCESS, payload: response.data})
    } catch(e: unknown) {
      if (typeof(e) === 'string') {
        console.log(e)
      }
      dispatch({type: FETCH_ERROR, payload: 'Произошла ошибка загрузки постов'})
    }
  }
}

export const setPostPage = (page: number): ActionType => {
  return {type: FETCH_PAGE, payload: page}
}