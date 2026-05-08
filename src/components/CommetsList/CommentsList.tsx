import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import type { StylesConfig, GroupBase, SingleValue, MultiValue } from 'react-select';
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { useAction } from '../../hooks/useAction'
import { type TComments } from '../../types/comments'
import { CustomSelect } from '../../ui/CustomSelect/CustomSelect'
import { MultiSelect } from '../../ui/MultiSelect/MultiSelect'
import { selectOptions, multiSelectOptions } from '../../consts/selectOptions'

import classes from './CommentsList.module.css'

type OptionType = {
  value: string;
  label: string;
};

const customStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
  control: (provided) => ({
    ...provided,
    cursor: 'pointer',
    border: 'none'
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid blue',
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: state.isSelected ? 'grey' : '',
    color: state.isSelected ? 'white'  : '',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white'
    },
  }),
  // Убираем стрелку
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  // Убираем разделитель между стрелкой и полем
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
   singleValue: (provided) => ({
    ...provided,
    cursor: 'pointer'
    // Здесь можно менять свойства
  }),
} 

const multiStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    border: 'none',
    height: state.menuIsOpen ? '175px' : 'auto'
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid orange',
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '0',
    margin: '0'
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: state.isSelected ? 'orange' : '',
    color: state.isSelected ? 'white'  : '',
    '&:hover': {
      backgroundColor: 'orange',
      color: 'white'
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
   singleValue: (provided) => ({
    ...provided,
    cursor: 'pointer'
  }),
  multiValue: () => ({
    display: 'flex',
    backgroundColor: 'orange',
  }),
  
  clearIndicator: () => ({
    display: 'none',
  }),
   multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'orange',
      color: 'white',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',  // 👈 отступы между тегами
    padding: '2px 4px',
  }),
} 

export const CommentsList = () => {
  const { loading, error, comments } = useTypedSelector(state => state.comments)
  const { commentsThunk } = useAction();
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [filteredData, setFilteredData] = useState<TComments[] | []>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const [selectedValue, setSelectedValue] = useState<string>(selectOptions[0].label)

  const searchHandler = () => {
    if (comments.length === 0) return;

    const searchTerm = searchRef.current?.value.toLowerCase().trim() || '';
  
  
    const filtered = filteredData.length !== 0 ? filteredData : comments

    if (searchTerm === '') {
      setFilteredData([]);
      setIsSearching(false)
      return;
    }
    
    setFilteredData([...filtered].filter((comment) => {
      if(searchRef.current) {
        return comment.name.toLowerCase().includes(searchRef.current.value) || comment.email.toLowerCase().includes(searchRef.current.value) || comment.body.toLowerCase().includes(searchRef.current.value)
      }
    }))

    setIsSearching(true)
  }

  const sortData = (option: keyof TComments | string) => {
    const validKeys: Array<keyof TComments> = ['name', 'email', 'body'];
    const sortedData = filteredData.length !== 0 ? filteredData : comments

    if(validKeys.includes(option as keyof TComments)) {
      setFilteredData([...sortedData].sort((a, b) => String(a[option as keyof TComments]).localeCompare(String(b[option as keyof TComments]))))
    } else if(typeof option === 'string' || option === 'id') {
      setFilteredData([...sortedData].sort((a, b) => a.id - b.id))
    } else {
      setFilteredData(filteredData)
    }
  }

  const arraySortData = (option: (keyof TComments)[] | string) => {
    const sortedData = filteredData.length !== 0 ? filteredData : comments
    if(Array.isArray(option) && option.length > 0) {
      const sorted = [...sortedData].sort((a, b) => {
            for (const key of option) {
                const comparison = String(a[key]).localeCompare(String(b[key]))
                if (comparison !== 0) return comparison
            }
            return 0
        })
      setFilteredData(sorted)
    } else if(typeof option === 'string' || option.includes('id')) {
      setFilteredData([...sortedData].sort((a, b) => String(a.id).localeCompare(String(b.id))))
    } else {
      setFilteredData(filteredData)
    }
  }

  useEffect(() => {
    commentsThunk()
  }, [])

  if(loading) {
    return <div>Идет загрузка комментариев...</div>
  }

  if(error) {
    return <div>{error}</div>
  }

  let displayData: TComments[] | [];
  let showNotFound = false;

  if (isSearching) {
    if (filteredData.length === 0) {
      showNotFound = true;
      displayData = [];
    } else {
      displayData = filteredData;
    }
  } else {
    displayData = filteredData.length > 0 ? filteredData : comments;
  }

  return (
    <div>
      <h2>Комментарии</h2>
      <div>
        <input type="text" placeholder="Поиск" ref={searchRef} />
        <button type='button' onClick={searchHandler}>Найти</button>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <CustomSelect options={[{text: 'по названию', value: 'name'}, {text: 'по email', value: 'email'}]} 
        defaultValue='Сортировать по:' selectFunction={sortData} />

          <MultiSelect options={[{text: 'по названию', value: 'name'}, {text: 'по email', value: 'email'}, {text: 'по комментарию', value: 'postId'}]} 
        defaultValue='Сортировать по:' selectFunction={arraySortData} />

        <Select 
          options={selectOptions} 
          placeholder="Сортировать по:" 
          className={classes.select} 
          isSearchable={false}
          isOptionDisabled={(option) => option.value === selectedValue}
          onChange={(newValue: SingleValue<OptionType>) => {
            if (newValue) {
              setSelectedValue(newValue.value);
              sortData(newValue.value)
            }
          }}
          styles={customStyles}
          isMulti={false}
         />

         <Select 
          options={multiSelectOptions} 
          placeholder="Сортировать по:" 
          className={classes.multiSelect} 
          isSearchable={false}
          onChange={(newValue: MultiValue<OptionType>) => {
            const selectedValue = newValue.map(option => option.value)
            if(typeof selectedValue !== 'string') {
              arraySortData(selectedValue as (keyof TComments)[])
            } else {
              arraySortData(selectedValue['id'])
            } 
          }}
          hideSelectedOptions={false}
          closeMenuOnSelect={false}
          styles={multiStyles}
          isMulti={true}
         />
        </div>
      </div>
      <ul>
        {showNotFound  ? (<h3>Комментарии не найдены</h3>) : (displayData.map((comment) => (
          <li key={comment.id} style={{border: '1px solid aqua'}}>
            <h3>{comment.id}. {comment.name}</h3>
            <p>{comment.postId}</p>
            <p>{comment.email}</p>
            <p>{comment.body}</p>
          </li>
        )))}
      </ul>
    </div>
  )
}
