import { useState, createContext, useContext } from "react"
import { IChildrenProps, ITransaction, ITransactionContext, ITransactionForm, User } from "../types/interfaces"
import axios from 'axios';
import { useAuthorisation } from './AuthContext';

const TransactionContext = createContext<ITransactionContext>({} as ITransactionContext)

export const useTransaction = () => {
  return useContext(TransactionContext)
}

export const TransactionProvider = ({ children }: IChildrenProps) => {
  const [transactionDetails, setTransactionDetails] = useState<User | null>(null)
  const [transactionHistory, setTransactionHistory] = useState<ITransaction[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { userData, getUserDetails } = useAuthorisation()

  const getAxiosOptions = () => {
    return {
      headers: {
        accept: 'application/json',
        'API-KEY': process.env.REACT_APP_API_KEY as string,
        'Content-Type': 'application/json'
      }
    }
  }

  const initiateTransaction = async (transactionFormData: ITransactionForm) => {
    setIsLoading(true)
    const axiosOptions = getAxiosOptions()
    const formData = { ...transactionFormData, sender: userData?.bankAccountNo }
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/transaction', formData, axiosOptions)
      if (response.data) {
        setTransactionDetails(response.data)
        setIsLoading(false)
        getUserDetails()
        return Promise.resolve('Transaction successful')
      }
    } catch (err) {
      setIsLoading(false)
      console.error(err)
      return Promise.resolve('Transaction failure')
    }
  }

  const getAllTransactions = async (signal: AbortSignal) => {
    setIsLoading(true)
    const axiosOptions = getAxiosOptions()
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/transactions/' + userData?.id, { signal, ...axiosOptions})
      setIsLoading(false)
      if (response.data) {
        setTransactionHistory(response.data)
        return Promise.resolve('Transactions fetch successful')
      }
    } catch (err) {
      setIsLoading(false)
      console.error(err)
      return Promise.resolve('Transactions fetch failure')
    }
  }

  return (
    <TransactionContext.Provider value={{ isLoading, transactionDetails, transactionHistory, setIsLoading, initiateTransaction, getAllTransactions, setTransactionHistory }}>
      {children}
    </TransactionContext.Provider>
  )
}
