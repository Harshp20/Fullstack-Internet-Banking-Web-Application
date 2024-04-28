import React, { useState, useEffect, useRef } from 'react'

interface IFormInputProps {
  label: string
  regex?: RegExp
  ispassmatch?: string
  errorText: string
  value?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({ label, value, errorText, handleChange, ...inputProps }: IFormInputProps) => {
  const [isVisited, setIsVisited] = useState(false)
  const [isValid, setIsValid] = useState(true)
  
  const handleFocus = () => {
    setIsVisited(true)
  }
  
  const inputRef = useRef<HTMLInputElement>(null)
  const validity = inputRef.current?.validity.valid

  useEffect(() => {
    setIsValid(!!validity)
    
    if (inputProps.regex) {
      const validity = inputProps.regex?.test(value as string)
      console.log(validity)
      setIsValid(validity as boolean)
    }
      
    if (inputProps.ispassmatch) {
      value && inputProps.ispassmatch != 'true' ? setIsValid(false) : setIsValid(true)
    }
  }, [validity, value, inputProps.ispassmatch])

  return (
    <div className={'flex flex-col gap-1'}>
      <label className={'text-slate-500'}>{label}</label>
      <input ref={inputRef} {...inputProps} onChange={handleChange} className={`peer px-4 py-3 border focus:outline-none focus:border-2 focus:border-purple-700 ${isVisited && !isValid && 'border-red-600'} placeholder-gray-300`} onBlur={handleFocus} />
      {isVisited && !isValid && <span className='text-red-600'>{errorText}</span>}
    </div>
  )
}

export default FormInput