import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormInput from './FormInput'
import Container from './Container';
import { IFormInput, IRegistrationForm } from '../types/interfaces';
import { useAuthorisation } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ButtonWithIcon from './ButtonWithIcon';

const initState = {
  name: '',
  loginId: '',
  email: '',
  password: '',
  'confirm-password': '',
  address1: '',
  address2: '',
  city: '',
  postcode: '',
  state: '',
  country: ''
}

const Registration = () => {
  const [registrationData, setRegistrationData] = useState<IRegistrationForm>(initState)
  const [btn, setBtn] = useState<React.ReactNode>()
  const { isLoading, userData, modifyUser, registerUser, setModifyUser } = useAuthorisation()
  const navigate = useNavigate()
  const [regInputs, setRegInputs] = useState<IFormInput[]>([] as IFormInput[])
  const regFormInputs: IFormInput[] = [
    {
      id: 1,
      label: 'Full Name',
      name: 'name',
      type: 'text',
      placeholder: 'Your Full Name',
      // pattern: '^[A-Za-z0-9]$',
      errorText: 'Please enter your full name',
      required: true
  
    },
    {
      id: 2,
      label: 'Login ID',
      name: 'loginId',
      type: 'text',
      placeholder: 'Your MyKad/Passport',
      errorText: 'Please enter your MyKad/Passport',
      required: true
    },
    {
      id: 3,
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorText: 'You need to enter you email address',
      required: true
    },
    {
      id: 4,
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      pattern: '^[A-Za-z][A-Za-z0-9!@#$%^&*()]{8,}$',
      errorText: 'Password must start with an alphabet, must contain a minimum of eight characters, at least one letter, one number and one special character',
      required: true
    },
    {
      id: 5,
      label: 'Confirm Password',
      name: 'confirm-password',
      type: 'password',
      placeholder: 'Confirm Password',
      pattern: '',
      errorText: 'Passwords don\'t match',
      required: true
    },
    {
      id: 6,
      label: 'Address Line 1',
      name: 'address1',
      type: 'text',
      placeholder: 'Address Line 1',
      errorText: 'Enter the address line 1',
      required: true
    },
    {
      id: 7,
      label: 'Address Line 2',
      name: 'address2',
      type: 'text',
      placeholder: 'Address Line 2',
      errorText: 'Enter the address line 2',
      required: true
    },
    {
      id: 8,
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'City',
      errorText: 'Please enter your city',
      required: true
    },
    {
      id: 9,
      label: 'Post Code',
      name: 'postcode',
      type: 'text',
      placeholder: 'Postal Code',
      errorText: 'Please enter your postal code',
      required: true
    },
    {
      id: 10,
      label: 'State',
      name: 'state',
      type: 'text',
      placeholder: 'State',
      errorText: 'Please enter your state',
      required: true
    },
    {
      id: 11,
      label: 'Country',
      name: 'country',
      type: 'text',
      placeholder: 'Country',
      errorText: 'Please enter your country',
      required: true
    },
  ]

  useEffect(() => {
    setRegInputs(regFormInputs)
    setBtn(getDefaultButton())
    if (userData) {
      setRegistrationData(userData)
    }
  }, [])

  useEffect(() => {
    if (isLoading) setBtn(<ButtonWithIcon icon={faSpinner} iconClasses='fa-spin' btnText={modifyUser ? 'Update' : 'Register'} btnClasses='p-3 w-2/5 self-start bg-purple-600 hover:bg-purple-500 active:bg-purple-600 text-white text-lg' />)
    else setBtn(getDefaultButton())
  }, [isLoading])

  useEffect(() => {
    setRegInputs(prevRegFormInputs => prevRegFormInputs.map(inputField => {
      if (inputField.name === 'confirm-password') {
        return { ...inputField, pattern: registrationData.password }
      } return inputField
    }) as IFormInput[])
  }, [registrationData.password])

  useEffect(() => {
    if (modifyUser) {
      setRegInputs(prevRegInputs => prevRegInputs.filter(inputfield => inputfield.name !== 'loginId'))
    }
    
    if (!modifyUser && userData) {
      navigate('/account/summary')
    }
  }, [modifyUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData(prevFormData => {
      return { ...prevFormData, [e.target.name]: e.target.value }
    })
  }

  const defaultButton = <ButtonWithIcon btnText={modifyUser ? 'Update' : 'Register'} btnClasses='p-3 w-[40%] rounded-none border border-purple-700 active:bg-white active:text-purple-700 self-start hover:text-white hover:bg-purple-700 active:ring-0 outline-none focus:ring-1 focus:ring-purple-500 text-purple-700 text-lg' />
  const getDefaultButton = () => {
    return defaultButton
  }

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isLoggedIn = await registerUser(registrationData)
    if (isLoggedIn === 'Registration/Update successful') {
      if (modifyUser && userData) {
        navigate('/account/summary')
        setModifyUser(false)
      }
      else navigate('/')
    }
    else navigate('/error')
  }

  return (
    <div className='w-full grid place-items-center p-8'>
      <Container styles='w-1/2'>
        <div className="w-[65%]">
          <span className='text-3xl font-semibold text-purple-800'>{modifyUser ? 'Modify Account Details' : 'Register Yourself'}</span>
          <form onSubmit={handleRegistration} className='flex mt-4 flex-col gap-4'>
            {regInputs.map(inputProps => (
              <FormInput key={inputProps.id} {...inputProps} handleChange={handleChange} value={registrationData[inputProps.name as keyof IRegistrationForm]} />
            ))}
            <div className='mt-2 flex flex-row items-end justify-between'>
              {btn}
              {!modifyUser && <span className='text-purple-800 mb-2'>Already have an account? <Link className='underline cursor-pointer' to={'/'}>Login</Link></span>}
              {modifyUser && <button onClick={() => setModifyUser(false)} className='p-3 w-[40%] self-center bg-purple-600 hover:bg-purple-500 active:bg-purple-600 rounded-sm text-white font-semibold text-lg'>Cancel</button>}
            </div>
          </form>
        </div>
      </Container>
    </div >
  )
}

export default Registration