import React, { useState, useRef, useEffect } from 'react'

interface IFormInputProps {
  id: number
  name: string
  type: string
  label: string
  placeholder: string
  errorText: string
  value?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({ id, label, errorText, handleChange, value, ...inputProps }: IFormInputProps) => {
  const [isVisited, setIsVisited] = useState(false)
  const [isValid, setIsInvalid] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsVisited(true)
  }

  const validity = inputRef.current?.validity.valid
  useEffect(() => {
    setIsInvalid(validity as boolean)
  }, [validity])

  return (
    <div className={'flex flex-col gap-1'}>
      <label className={'text-slate-500'}>{label}</label>
      <input ref={inputRef} {...inputProps} onChange={handleChange} className={`peer px-4 py-3 border focus:outline-none focus:border-2 focus:border-purple-700 ${isVisited && !isValid && 'border-red-600'} placeholder-gray-300`} onBlur={handleFocus} value={value}/>
      {isVisited && !isValid && <span className='invisible peer-invalid:visible text-red-600'>{errorText}</span>}
    </div>
  )
}

export default FormInput