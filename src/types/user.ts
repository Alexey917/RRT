export const DATA_LOADING = 'DATA_DATA_LOADING';
export const DATA_SUCCESS = 'DATA_SUCCESS'
export const DATA_ERROR = 'DATA_ERROR'

export interface IUser {
  id: number;
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

export interface typeState {
  state: IUser[],
  loading: boolean,
  error: null | string
}

export interface typeActionSuccess {
  type: typeof DATA_SUCCESS;
  payload: IUser[];
}

export interface typeActionLoading {
  type: typeof DATA_LOADING;
}

export interface typeActionError {
  type: typeof DATA_ERROR;
  payload: string;
}

export type typeAction  = typeActionError | typeActionSuccess | typeActionLoading
