
import './App.css'
import { CommentsList } from './components/CommetsList/CommentsList'
import { PostList } from './components/PostList/PostList'
import TodoList from './components/TodoList/TodoList'
import { UserList } from './components/UserList/UserList'


function App() {
  return (
    <>
      <UserList />
      <hr style={{height: '2px', backgroundColor: 'green', width: '100%'}} />
      <TodoList />
      <hr style={{height: '2px', backgroundColor: 'green', width: '100%'}} />
      <PostList />
      <hr style={{height: '2px', backgroundColor: 'green', width: '100%'}} />
      <CommentsList />
    </>
  )
}

export default App
