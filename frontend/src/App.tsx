import Login from './components/Login'
import Registration from './components/Registration';
import { Routes, Route } from 'react-router-dom'
import AccountSummary from './components/AccountSummary';
import { AuthRequired } from './utilities/AuthRequired';
import TransactionHistory from './components/TransactionHistory';
import Error from './components/NotFound'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='w-full grid place-items-center'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/account' element={<AuthRequired />}>
          <Route path='summary' element={<AccountSummary />} />
          <Route path='transaction-history' element={<TransactionHistory />} />
          <Route path='modify-user' element={<Registration />} />
        </Route>
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Error />} />
      </Routes>

      <ToastContainer
        position={'bottom-left'}
        autoClose={2500}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme={'light'}
        closeOnClick={true}
        transition={Slide}
        // progressStyle={{background: "rgb(107 33 168)"}}
      />
    </div>
  );
}

export default App;
