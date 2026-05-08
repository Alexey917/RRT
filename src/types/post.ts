export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_PAGE ='FETCH_PAGE'

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IInitialState {
  post: IPost[],
  loading: boolean,
  error: null | string,
  page: number,
  limit: number,
  hasMore: boolean
}

export interface IActionPosts {
  type: typeof FETCH_POSTS
}

export interface IActionSuccess {
  type: typeof FETCH_SUCCESS
  payload: IPost[]
}

export interface IActionError {
  type: typeof FETCH_ERROR
  payload: string
}

export interface IActionPage {
  type: typeof FETCH_PAGE
  payload: number
}

export type ActionType = IActionPosts | IActionSuccess | IActionError | IActionPage






