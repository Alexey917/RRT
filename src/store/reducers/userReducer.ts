import { type typeState, type typeAction,  DATA_LOADING, DATA_SUCCESS, DATA_ERROR } from '../../types/user'

const initialState: typeState = {
  state: [],
  loading: false,
  error: null
}

export const userReducer = (state = initialState, action: typeAction): typeState => {
  switch(action.type) {
    case DATA_LOADING:
      return {state: [], loading: true, error: null};
    case DATA_SUCCESS:
      return {state: action.payload, loading: false, error: null};
    case DATA_ERROR:
      return {state: [], loading: false, error: action.payload};
    default:
      return state;
  }
}