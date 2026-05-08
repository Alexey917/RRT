import { useRef, useEffect } from "react"

export const useCloseSelect = (close: boolean, setClose: (state: boolean) => void) => {
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!close) return 

    const handleClick = (e: MouseEvent) => {
      const inside = selectRef.current?.contains(e.target as Node)
      if(selectRef.current &&  !inside) {
        setClose(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [close, setClose])

  return { selectRef }
}