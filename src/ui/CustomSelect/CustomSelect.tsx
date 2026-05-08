import { useState } from 'react'
import classes from './CustomSelect.module.css'
import { useCloseSelect } from '../../hooks/useCloseSelect';


export interface IOption<T> {
  text: string;
  value: T;
}

interface ICustomSelectProps<T> {
  options: IOption<T>[];
  defaultValue: string;
  selectFunction: (option: T | string) => void;
}

export const CustomSelect = <T,>({options, defaultValue, selectFunction}: ICustomSelectProps<T>) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [select, setSelect] = useState<string>(defaultValue);
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
      setSelect(option.text)
      selectFunction(option.value)
      toggleList()
  }

  return (
    <div className={classes.select} style={{border: '1px solid blue', width: '250px'}} ref={selectRef}>
      <button 
        type='button' 
        aria-expanded={toggle} 
        aria-haspopup="listbox" 
        onClick={toggleList} 
        className={classes.btn}  
      >
        {select}
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
            aria-selected={option.text === select}
            className={option.text === select ? classes.disable : classes.choose}
            onClick={option.text === select ? undefined : () => handleSelect(option)}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

