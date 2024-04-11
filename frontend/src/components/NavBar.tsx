import { faBuildingColumns, faRightFromBracket, faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ButtonWithIcon from './ButtonWithIcon';
import { useAuthorisation } from '../contexts/AuthContext'

interface INavBar {
  mode?: string
}

const NavBar = ({ mode }: INavBar) => {
  const { userData, logOutUser, isLoading } = useAuthorisation()
  const [btn, setBtn] = useState<React.ReactNode>(getDefaultButton())
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) setBtn(<ButtonWithIcon icon={faSpinner} iconClasses='fa-spin' btnText='Logout' btnClasses='p-3 hover:bg-purple-600 active:bg-purple-600 text-white font-semibold text-lg' />)
    else setBtn(getDefaultButton())
  }, [isLoading])

  function getDefaultButton() {
    return <ButtonWithIcon btnText='Logout' icon={faRightFromBracket} btnClasses='p-3 hover:bg-purple-600 active:bg-purple-600 text-white font-semibold text-lg' />
  }

  const handleLogOut = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault()
    const logoutStatus = await logOutUser()
    if (logoutStatus === 'Logout successful') navigate('/')
  }

  return (
    <div>
      <nav className='flex flex-row items-center justify-between select-none bg-purple-700 text-white relative top-0 px-10 py-4 shadow-nav'>
        <div className='cursor-default flex flex-row items-baseline'>
          <ButtonWithIcon btnText='KL Bank' textClasses='cursor-default font-semibold font-sans text-[2.5rem] mr-10 ml-2' btnClasses='cursor-default outline-none flex flex-row-reverse' icon={faBuildingColumns} iconClasses='cursor-default text-5xl' />
        </div>
        {(mode !== 'default') && <ul className='flex flex-row gap-10 text-xl items-center justify-between'>
          <li><Link to='/account/transaction-history' className='cursor-pointer px-4 py-3 hover:bg-purple-600'>Transactions</Link></li>
          <li><Link to='/account/summary' className='cursor-pointer px-4 py-3 hover:bg-purple-600'>Account Summary</Link></li>
          <li onClick={(e) => handleLogOut(e)}>{btn}</li>
        </ul>}
      </nav>
      {(mode !== 'default') && <div className='pl-10 py-3 text-2xl bg-purple-100 w-full border border-purple-600 text-purple-700 capitalize border-bot'>Welcome, {userData?.name}</div>}
    </div>
  )
}

export default NavBar