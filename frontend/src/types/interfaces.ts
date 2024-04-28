export interface IRegistrationForm {
  name: string;
  loginId: string;
  email: string;
  password: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  state: string;
  country: string;
}

export interface User extends IRegistrationForm {
  id: string;
  bankAccountNo: string;
  bankAccountBalance: number;
  type: string;
  token?: string
}

export interface IFormInput {
  id: number;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  regex?: RegExp;
  ispassmatch?: string;
  errorText: string;
  required?: boolean;
}
export interface ILoginForm {
  loginId: string;
  password: string;
}

export interface ITransactionForm {
  recipientAccountNo: string;
  amount: number;
}

export interface IChildrenProps {
  children?: React.ReactNode;
}

export interface IModal extends IChildrenProps {
  styles?: string;
  title: string;
}

export interface ITransaction {
  id: string;
  recipient: string;
  sender: string;
  value: number;
  datetime: string;
}

export interface ITransactionContext {
  isLoading: boolean;
  transactionDetails: User | null;
  transactionHistory: ITransaction[] | null;
  setIsLoading: (val: boolean) => void;
  initiateTransaction: (
    transactionDetails: ITransactionForm
  ) => Promise<string | undefined>;
  getAllTransactions: (signal: AbortSignal) => Promise<string | undefined>;
  setTransactionHistory: (val: ITransaction[] | null) => void;
}

export interface IAuthValues {
  userData: User | null;
  setUserData: (val: User | null) => void;
  isLoading: boolean;
  isError: boolean;
  isRegistered: boolean;
  isLoggedIn: () => boolean;
  setIsLoading: (val: boolean) => void;
  loginUser: (loginFormData: ILoginForm) => Promise<string>;
  logOutUser: () => Promise<string | undefined>;
  registerUser: (
    registrationData: IRegistrationForm
  ) => Promise<string | undefined>;
  modifyUser: boolean;
  setModifyUser: (val: boolean) => void;
  getUserDetails: () => Promise<string | undefined>;
}
