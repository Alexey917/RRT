import { useState } from 'react'
import classes from './MultiSelect.module.css'
import { useCloseSelect } from '../../hooks/useCloseSelect';


export interface IOption<T> {
  text: string;
  value: T;
}

interface ICustomSelectProps<T> {
  options: IOption<T>[];
  defaultValue: string;
  selectFunction: (option: T[] | string) => void;
}

export const MultiSelect = <T,>({options, defaultValue, selectFunction}: ICustomSelectProps<T>) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [select, setSelect] = useState<string[] | string>([]);
  const [optionValue, setOptionValue] = useState<T[]>([]);
  // const [active, setActive] = useState<boolean>(false)
  const { selectRef } = useCloseSelect(toggle, setToggle);


  const toggleList = () => {
    setToggle(!toggle)
  }

  const handleDefaultValue = (value: string) => {
    setSelect(defaultValue)
    selectFunction(value)
    toggleList()
  }

  const handleSelect = (option: IOption<T>) => {
    if (select.includes(option.text)) {
      const currentSelect = Array.isArray(select) ? select : []
      const deleteSelect = currentSelect.filter((elem) => elem !== option.text)
      setSelect(deleteSelect)
      const deleteOptionValue = optionValue.filter((elem) => elem !== option.value)
      setOptionValue(deleteOptionValue)
      selectFunction(deleteOptionValue)
    } else {
      const newOptionValue = [...optionValue, option.value]
      const newSelect = [...select, option.text]
      setSelect(newSelect)
      setOptionValue(newOptionValue)
      selectFunction(newOptionValue)
    }
  }

  return (
    <div className={classes.select} style={{border: '1px solid orange', width: '250px'}} ref={selectRef}>
      <button 
        type='button' 
        aria-expanded={toggle} 
        aria-haspopup="listbox" 
        onClick={toggleList} 
        className={classes.btn}  
      >
        {defaultValue}
      </button>
      <ul role='listbox' className={toggle ? classes.listOpen : classes.list}>
        <li 
          role="option"
          aria-selected={defaultValue === select}
          className={defaultValue === select ? classes.disable : classes.choose}
          onClick={defaultValue === select ? undefined : () => handleDefaultValue(defaultValue)}
        >
          {defaultValue}
        </li>
        {options.map((option, index) => (
          <li
            key={`${option.value}-${index}`}
            role="option"
            aria-selected={select.includes(option.text)}
            className={select.includes(option.text) ? `${classes.choose} ${classes.active}` : classes.choose}
            onClick={() => handleSelect(option)}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

