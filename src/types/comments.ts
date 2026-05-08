export const COMMENTS_LOADING = 'COMMENTS_LOADING';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_ERROR = 'COMMENTS_ERROR';

export type TComments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IInitialState {
  loading: boolean;
  comments: TComments[] | [];
  error: string | null;
}

export interface ISuccess {
  type: typeof COMMENTS_SUCCESS;
  payload: TComments[]
}

export interface ILoading {
  type: typeof COMMENTS_LOADING;
}

export interface IError {
  type: typeof COMMENTS_ERROR;
  payload: string;
}

export type typeAction = ISuccess | ILoading | IError;