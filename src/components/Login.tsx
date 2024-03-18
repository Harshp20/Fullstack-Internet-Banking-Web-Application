import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormInput from './FormInput'
import Container from './Container';
import { ILoginForm, IFormInput } from '../types/interfaces';
import { useAuthorisation } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import ButtonWithIcon from './ButtonWithIcon';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import NavBar from './NavBar';

const initState: ILoginForm = { loginId: '', password: '' }

const Login = () => {
  const [loginFormData, setLoginFormData] = useState<ILoginForm>(initState)
  const [btn, setBtn] = useState<React.ReactNode>(getDefaultButton())

  const auth = useAuthorisation()
  const navigate = useNavigate()
  const loginInputs: IFormInput[] = [
    {
      id: 1,
      label: 'Login ID',
      name: 'loginId',
      type: 'text',
      placeholder: 'Login ID',
      errorText: 'Enter Login ID',
      required: true

    },
    {
      id: 2,
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorText: 'Enter your password',
      required: true
    }
  ]

  useEffect(() => {
    if (auth.isLoading) setBtn(<ButtonWithIcon icon={faSpinner} iconClasses='fa-spin' btnText='Logging in' btnClasses='p-3 w-2/5 self-start bg-purple-600 hover:bg-purple-500 active:bg-purple-600 text-white text-lg' />)
    else setBtn(getDefaultButton())
  }, [auth.isLoading])

  function getDefaultButton() {
    return <ButtonWithIcon btnText='Login' btnClasses='rounded-none border border-purple-700 active:bg-white active:text-purple-700 p-3 w-2/5 self-start hover:text-white hover:bg-purple-700 active:ring-0 outline-none focus:ring-1 focus:ring-purple-500 text-purple-700 text-lg' />
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData(prevFormData => {
      return { ...prevFormData, [e.target.name]: e.target.value }
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isLoggedIn = await auth.loginUser(loginFormData)
    if (isLoggedIn === 'Login successful') {
      navigate('/account/summary')
    }
  }

  return (
    <div className='w-full'>
      <NavBar mode='default' />
      <div className='min-h-[80vh] grid place-items-center grid-cols-2 items-center gap-[5rem] justify-center p-8'>
        <div className='text-5xl w-[99%] leading-[5rem] whitespace-nowrap overflow-hidden animate-typewriter  text-purple-800'>Log In to Personal Banking</div>
        <Container styles='w-3/4'>
          <div className='w-[80%]'>
            <span className='text-3xl font-semibold text-purple-800'>Login</span>
            <form onSubmit={handleLogin} className='flex mt-4 flex-col gap-4'>
              {loginInputs.map(inputProps => <FormInput key={inputProps.id} {...inputProps} handleChange={handleChange} />)}
              {auth.isError && <span className='text-red-600'>Invalid Credentials/User Doesn't Exist</span>}
              {auth.isLoggedOut && <span className='text-green-700'>Successfully Logged Out!</span>}
              {auth.isRegistered && <span className='text-green-700'>Successfully Registered! Please Log In</span>}
              <div className='mt-2 flex flex-row items-end justify-between'>
                {btn}
                <span className='text-purple-800 mb-2'>New here? <Link className='underline cursor-pointer' to={'/register'}>Register</Link></span>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Login