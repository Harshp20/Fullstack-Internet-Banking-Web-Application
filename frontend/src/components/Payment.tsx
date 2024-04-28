import ButtonWithIcon from "./ButtonWithIcon"
import { faSpinner, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from "react"
import { useTransaction } from "../contexts/TransactionContext"
import { StatusModal } from "./StatusModal"
import { useAuthorisation } from "../contexts/AuthContext"
import { toast } from "react-toastify"
interface ITransactionProps {
  activateTransaction: () => void
}

const Payment = ({ activateTransaction }: ITransactionProps) => {
  const [recipientAccountNo, setRecipient] = useState('')
  const [amount, setAmount] = useState(0)
  const [transactionStatus, setTransactionStatus] = useState<string>('')
  const [btn, setBtn] = useState<React.ReactNode>(getDefaultButton())
  const { isLoading, transactionDetails, initiateTransaction } = useTransaction()
  const { userData } = useAuthorisation()

  useEffect(() => {
    if (isLoading) setBtn(<ButtonWithIcon icon={faSpinner} iconClasses='fa-spin' btnText='Processing' btnClasses='p-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-600 text-white text-lg' />)
    else setBtn(getDefaultButton())
  }, [isLoading])

  function getDefaultButton() {
    return <ButtonWithIcon btnText='Send Money' icon={faPaperPlane} btnClasses='px-4 py-3 text-white font-semibold bg-purple-700 hover:bg-purple-600' />
  }

  const handleTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userData?.bankAccountBalance as number - amount < 0) {
      toast.error('Insufficient balance', { hideProgressBar: true, theme: 'colored' })
      return
    }

    const response = await initiateTransaction({ recipientAccountNo, amount })
    if (response !== 'Transaction successful') setTransactionStatus('Transaction failure')
    else setTransactionStatus('Transaction successful')
  }

  return (
    <div className="p-8">
      {!transactionStatus && <form onSubmit={(e) => handleTransaction(e)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Account Number</label>
          <input type="text" className="p-2" onChange={(e) => setRecipient(e.target.value)} placeholder="Account Number" required />
        </div>
        <div className="flex flex-col gap-2">
          <label>Amount</label>
          <input type="text" className="p-2" onChange={(e) => setAmount(parseInt(e.target.value))} placeholder="Amount in RM" required />
        </div>
        <div className="mt-2 w-full flex flex-row items-center justify-between">
          {btn}
          <div onClick={activateTransaction}>
            <ButtonWithIcon btnText='Cancel' icon={faCircleXmark} btnClasses='px-8 py-3 text-red-500 hover:text-white font-semibold border border-red-500 hover:bg-red-500 active:bg-transparent active:text-red-500' />
          </div>
        </div>
      </form>}

      {(transactionStatus === 'Transaction failure') && <div className="flex flex-col items-center gap-4">
        <StatusModal errorText={'Transaction Failed'} icon={faCircleXmark} styles='text-red-500 text-2xl' />
        <div onClick={activateTransaction}>
          <ButtonWithIcon btnText='Close' btnClasses='px-8 py-3 text-red-500 hover:text-white font-semibold border border-red-500 hover:bg-red-500 active:bg-transparent active:text-red-500' />
        </div>
      </div>}

      {transactionStatus === 'Transaction successful' && <div className="flex flex-col items-center gap-4">
        <StatusModal errorText={'Transaction Successful'} icon={faCheck} styles='text-green-600 text-2xl' />
        <div className="text-center">
          <span className="text-amber-900">Transaction ID: </span>
          <span className="font-thin">{transactionDetails?.id}</span>
        </div>
        <div onClick={activateTransaction}>
          <ButtonWithIcon btnText='Close' btnClasses='px-8 py-3 text-green-600 hover:text-white font-semibold border border-green-600 hover:bg-green-600 active:bg-transparent active:text-green-600' />
        </div>
      </div>}
    </div>
  )
}

export default Payment