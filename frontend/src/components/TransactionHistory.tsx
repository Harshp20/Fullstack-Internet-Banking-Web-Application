import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useTransaction } from '../contexts/TransactionContext'

const TransactionHistory = () => {
  const { isLoading, transactionHistory, getAllTransactions, setTransactionHistory } = useTransaction()

  useEffect(() => {
    if (transactionHistory) setTransactionHistory(null)

    const controller = new AbortController()
    const signal = controller.signal
    getAllTransactions(signal)

    // Logic to abort repetitive transaction requests to avoid memory leaks
    return () => {
      controller.abort()
    }
  }, [])

  const getDateTime = (baseDate: string) => {
    const date = new Date(baseDate).toDateString()
    const time = new Date(baseDate).toLocaleTimeString()
    return `${date}, ${time}`
  }

  return (
    <div className='w-full grid place-items-center min-h-[80vh]'>
      <div className='grid grid-rows-[17%_1fr] rounded-md border-2 border-purple-500 shadow-lg min-h-[60%] w-4/5'>
        <nav className='bg-purple-700 flex flex-row items-center select-none text-white relative top-0 px-8 py-3 rounded-t-sm shadow-md'>
          <span className='text-2xl capitalize'>Recent Transactions</span>
        </nav>
        {(!transactionHistory && isLoading) ? <div className='min-h-[40vh] grid place-items-center'>
          <FontAwesomeIcon className='fa-spin text-5xl text-purple-700' icon={faSpinner} />
        </div>
          :
          ((!transactionHistory && !isLoading) ? (
            <div className="flex flex-col justify-center items-center gap-4">
              <span className='text-red-500 text-2xl'>No Transactions Available</span>
            </div>)
            : <div className='flex flex-col gap-6 px-8 py-4 max-h-[60vh] overflow-y-auto rounded-b-md'>
              {transactionHistory?.map(data =>
                <div key={data.id} className='flex flex-col gap-2 py-5 px-8 border border-purple-700 bg-purple-100/30 rounded-md hover:bg-purple-100/80 [&>span]:text-gray-800'>
                  <span>Transaction ID: <span className="text-amber-900">{data.id}</span></span>
                  <span>Recipient Account: <span className='text-black '>{data.recipient}</span></span>
                  <span>Amount: <span className='text-green-700 text-2xl'>RM{data.value}</span></span>
                  <span>Date & Time: <span className='text-black '>{getDateTime(data.datetime)}</span></span>
                </div>)}
            </div>)}
      </div>
    </div>
  )
}

export default TransactionHistory