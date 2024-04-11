import { useState, createContext, useContext } from "react"
import { IAuthValues, IChildrenProps, ILoginForm, IRegistrationForm, User } from "../types/interfaces"
import axios from 'axios';

const AuthContext = createContext<IAuthValues>({} as IAuthValues)

export const useAuthorisation = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [modifyUser, setModifyUser] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const createFormData = (registrationData: IRegistrationForm) => {
    let formData;
    if (modifyUser) {
      formData = {
        ...registrationData,
        bankAccountBalance: userData?.bankAccountBalance || 100,
      }
    } else {
      formData = {
        ...registrationData,
        bankAccountNo: Date.now().toString(),
        bankAccountBalance: userData?.bankAccountBalance || 100,
        type: 'customer',
      }
    }
    delete formData['confirm-password' as keyof IRegistrationForm]
    return formData
  }

  const getAxiosOptions = () => {
    return {
      headers: {
        accept: 'application/json',
        'API-KEY': process.env.REACT_APP_API_KEY as string,
        'Content-Type': 'application/json'
      }
    }
  }

  const getUserDetails = async () => {
    const axiosOptions = getAxiosOptions()
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/user/' + userData?.id, axiosOptions)
      if (response.data) {
        setUserData(response.data)
        return Promise.resolve('Get User Successful')
      }
    } catch (err) {
      console.error(err)
      return Promise.reject('Get User Failure')
    }
  }

  const loginUser = async (loginFormData: ILoginForm) => {
    const axiosOptions = getAxiosOptions()
    const formData = loginFormData
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/login', formData, axiosOptions)
      if (response.data) {
        setUserData(response.data)
        setIsLoading(false)
        return Promise.resolve('Login successful')
      }
    } catch (err) {
      setIsError(true)
      setTimeout(() => setIsError(false), 3000)
      console.error(err)
      return Promise.reject('Login failure')
    }
  }

  const logOutUser = async () => {
    setIsLoading(true)
    const axiosOptions = getAxiosOptions()
    const formData = { loginId: userData?.loginId }
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/logout', formData, axiosOptions)
      setIsLoading(false)
      if (response.status === 200) {
        setUserData(null)
        setIsLoggedOut(true)
        setTimeout(() => setIsLoggedOut(false), 3000)
        return Promise.resolve('Logout successful')
      }
    } catch (err) {
      setIsLoading(false)
      console.error(err)
      return Promise.reject('Logout failure')
    }
  }

  const registerUser = async (registrationData: IRegistrationForm) => {
    setIsLoading(true)
    const formData = createFormData(registrationData)
    const axiosOptions = getAxiosOptions()
    try {
      let response;
      if (modifyUser && userData) {
        response = await axios.put(process.env.REACT_APP_API_URL + '/auth/edit_customer' + userData.id, formData, axiosOptions)
      } else {
        response = await axios.post(process.env.REACT_APP_API_URL + '/auth/signup', formData, axiosOptions)
      }
      setIsLoading(false)
      setIsRegistered(true)
      setTimeout(() => setIsRegistered(false), 3000)
      if (response.data) {
        if (modifyUser) {
          setUserData(response.data)
        }
        return Promise.resolve('Registration/Update successful')
      }
    } catch (err) {
      setIsLoading(false)
      console.error(err)
      return Promise.reject('Registration/Update failure')
    }
  }

  return (
    <AuthContext.Provider value={{ userData, setUserData, isLoading, isError, isLoggedOut, logOutUser, isRegistered, setIsLoading, loginUser, registerUser, modifyUser, setModifyUser, getUserDetails }}>
      {children}
    </AuthContext.Provider>
  )
}