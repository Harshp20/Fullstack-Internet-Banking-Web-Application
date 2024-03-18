import { useEffect, useState } from 'react'
import { useAuthorisation } from '../contexts/AuthContext'
import Container from './Container'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import ButtonWithIcon from './ButtonWithIcon'
import Modal from './Modal'
import Payment from './Payment'
import { useNavigate } from "react-router-dom";
import SummaryItem from './SummaryItem'

const AccountSummary = () => {
  const [transact, setTransact] = useState(false)
  const { userData, modifyUser, setModifyUser } = useAuthorisation()
  const navigate = useNavigate()

  useEffect(() => {
    if (modifyUser) navigate('/account/modify-user')
  }, [modifyUser])

  useEffect(() => {
    if (modifyUser) setModifyUser(false)
  }, [])

  const activateTransaction = () => {
    setTransact(prevState => !prevState)
  }

  const summaryItems = [
    { title: 'Name:', text: userData?.name || 'NA' },
    { title: 'Current Balance:', text: 'RM' + userData?.bankAccountBalance || 'NA', textStyles: 'text-green-700 font-thin text-3xl' },
    { title: 'Login ID:', text: userData?.loginId || 'NA' },
    { title: 'Account Number:', text: userData?.bankAccountNo || 'NA' },
    { title: 'Type:', text: userData?.type || 'NA' },
    { title: 'Email:', text: userData?.email || 'NA' },
    { title: 'City:', text: userData?.city || 'NA' },
    { title: 'Postal Code:', text: userData?.postcode || 'NA' },
    { title: 'State:', text: userData?.state || 'NA' },
    { title: 'Country:', text: userData?.country || 'NA' },
  ]

  return (
    <div className='min-h-[70vh] w-full grid place-items-center'>
      <Container styles='pt-0 w-[70%]'>
          <nav className='w-full flex flex-row items-center justify-between select-none bg-purple-700 text-white relative top-0 px-8 py-2 rounded-t-md'>
          <span className='text-2xl capitalize border-bot'>Account Summary</span>
          <div className='flex flex-row gap-4'>
            <button onClick={activateTransaction} className='px-4 py-3 hover:bg-purple-600'>Transfer Funds</button>
            <div onClick={() => setModifyUser(true)}>
              <ButtonWithIcon btnText='Edit Details' btnClasses='px-4 py-3 hover:bg-purple-600' icon={faEdit} />
            </div>
          </div>
        </nav>
        <div className='grid grid-cols-account-summary-col grid-rows-account-summary-row mt-4 gap-y-5 gap-8 items-start w-full px-8 py-2'>
          {summaryItems.map(item => <SummaryItem key={item.title} {...item} />)}
        </div>
      </Container>
      {transact && <Modal title='Make Payment'>{<Payment activateTransaction={activateTransaction} />}</Modal>}
    </div>
  )
}

export default AccountSummary