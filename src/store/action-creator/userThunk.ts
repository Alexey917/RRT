import { type typeAction } from '../../types/user'
import { DATA_ERROR, DATA_LOADING, DATA_SUCCESS } from "../../types/user";
import axios from "axios";
import type { Dispatch } from "redux";

export const userThunk = () => {

  return async (dispatch: Dispatch<typeAction>) => {
    try {
      dispatch({type: DATA_LOADING});
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setTimeout(() => {
        dispatch({type: DATA_SUCCESS, payload: response.data});
      }, 1000);
    } catch (e: unknown) {
      if (typeof(e) === 'string') {
        console.log(e)
      } else {
        dispatch({type: DATA_ERROR, payload: 'Произошла ошибка при загрузке пользователей'});
      }
      
    }
  }
} 