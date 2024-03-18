import { useAuthorisation } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import { IChildrenProps } from '../types/interfaces'
import NavBar from '../components/NavBar'

export const AuthRequired = ({ children }: IChildrenProps) => {
  const { userData } = useAuthorisation()
  if (!userData) return <Navigate to={'/'} />

  return (
    <div className='min-h-screen w-full'>
      <NavBar />
      <Outlet />
      {children}
    </div>
  )
}
