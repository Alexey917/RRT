import { useEffect } from 'react'
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { useAction } from '../../hooks/useAction';



const TodoList = () => {
  
  const { loading, todo, error, page, limit } = useTypedSelector(state => state.todos)
  const { todoThunk, setTodoPage } = useAction();
  const pages = [1, 2, 3, 4, 5];


  useEffect(() => {
    console.log(page)
    todoThunk(page, limit)
  }, [page])

  if (loading) {
    return <div>Идет загрузка...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>Список дел:</h2>
      <ul>
        {todo.map((elem) => (
            <li key={elem.id}>{elem.id} - {elem.title}</li>
        ))}
      </ul>  
      <div style={{display: 'flex', gap: '10px'}}>
        {pages.map((elem) => (
          <div key={elem} style={{padding: '5px', border: elem === page ? '1px solid green' : '1px solid grey', cursor: 'pointer'}} 
          onClick={() => setTodoPage(elem)}>
            {elem}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList
