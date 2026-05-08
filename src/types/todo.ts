export const TODO_LOADING = 'TODO_LOADING';
export const TODO_SUCCESS = 'TODO_SUCCESS';
export const TODO_ERROR = 'TODO_ERROR';
export const TODO_PAGE = 'TODO_PAGE'

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodoState {
  todo: ITodo[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
}

export interface ITodoLoading {
  type: typeof TODO_LOADING;
}

export interface ITodoSuccess {
  type: typeof TODO_SUCCESS;
  payload: ITodo[];
}

export interface ITodoError {
  type: typeof TODO_ERROR;
  payload: string;
}

export interface ITodoPage {
  type: typeof TODO_PAGE;
  payload: number;
}

export type ActionType = ITodoLoading | ITodoSuccess | ITodoError | ITodoPage;