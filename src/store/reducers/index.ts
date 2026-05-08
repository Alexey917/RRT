import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { todoReducer } from "./todoReducer";
import { postReducer } from "./postReducer";
import { CommentsReducer } from "./commetsReducer";

export const rootReducer = combineReducers({
  users: userReducer,
  todos: todoReducer,
  posts: postReducer,
  comments: CommentsReducer 
})

export type RootState = ReturnType<typeof rootReducer>