import axios from 'axios'
import type { Dispatch } from "react"
import { COMMENTS_LOADING, COMMENTS_SUCCESS, COMMENTS_ERROR, type typeAction } from "../../types/comments"

export const commentsThunk = () => {
  return async (dispatch: Dispatch<typeAction>) => {
    try {
      dispatch({type: COMMENTS_LOADING})
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=40');
      dispatch({type: COMMENTS_SUCCESS, payload: response.data})
    } catch(e: unknown) {
      if (typeof(e) === 'string') {
        console.log(e)
      }
      dispatch({type: COMMENTS_ERROR, payload: 'Произошла ошибка загрузки комментариев'})
    }
  }
}