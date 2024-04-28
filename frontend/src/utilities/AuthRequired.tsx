import { useAuthorisation } from '../contexts/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import { IChildrenProps } from '../types/interfaces'
import NavBar from '../components/NavBar'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const AuthRequired = ({ children }: IChildrenProps) => {
  const { isLoggedIn } = useAuthorisation()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn()) {
      toast.warning('Please log in to your account', { hideProgressBar: true })
      return navigate('/')
    }
  }, [])

  return (
    <div className='min-h-screen w-full'>
      <NavBar />
      <Outlet />
      {children}
    </div>
  )
}
