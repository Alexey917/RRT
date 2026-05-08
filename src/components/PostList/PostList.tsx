import { useTypedSelector } from '../../hooks/useTypeSelector'
import { useAction } from '../../hooks/useAction'
import { useEffect, useRef } from 'react';

export const PostList = () => {
  const { post, loading, page, limit, error, hasMore } = useTypedSelector(state => state.posts)
  const { postThunk, setPostPage } = useAction();
  const target = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!target.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting  && !loading && hasMore) {
          const nextPage = page + 1
          postThunk(nextPage, limit)
          setPostPage(nextPage)
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0
      }
    )

    observer.observe(target.current)

    return () => {
      observer.disconnect()
    }
    
  }, [hasMore, page, loading ])



  if (loading && post.length === 0) {
    return <div>Идет загрузка...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div style={{marginTop: '40px'}}>
      <h2>Посты</h2>
      <ul>
        {post.map((el) => 
           (
            <li key={el.id} style={{border: '1px solid purple'}}>
                <h3>{el.id}. {el.title}</h3>
                <p>{el.body}</p>
            </li>
          )
        )}
      </ul>
      {hasMore && <div style={{width: '100%', height: '50px' }} ref={target}>
        {loading && <div>Загрузка следующих постов...</div>}
        </div>}
    </div>
  )
}

