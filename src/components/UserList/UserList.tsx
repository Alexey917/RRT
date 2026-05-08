import { useEffect } from 'react'
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { useAction } from '../../hooks/useAction'


export const UserList = () => {
  const { state, loading, error } = useTypedSelector(state => state.users)
  const { userThunk } = useAction();

  useEffect(() => {
    userThunk();
  }, [])

  if (loading) {
    return <div>Идет загрузка...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>Пользователи:</h2>
      <ul>
        {state.map((user) => (
            <li key={user.id}>{user.id} - {user.name}</li>
        ))}
      </ul>  
    </div>
  )
}


