import * as UserActionCreators from './userThunk'
import * as TodoActionCreators from './todoThunk'
import * as PostActionCreators from './postThunk'
import * as CommentsActionCreators from './commentsThunk'

export default {
  ...UserActionCreators, 
  ...TodoActionCreators,
  ...PostActionCreators,
  ...CommentsActionCreators
}