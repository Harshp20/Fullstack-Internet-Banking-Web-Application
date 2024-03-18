import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-screen grid place-items-center'>
      <div className='flex flex-col gap-4 items-center'>
        <span className='text-5xl text-purple-700'>Snap! Something went wrong</span>
        <Link className='mt-4 rounded-none border border-purple-700 active:bg-white active:text-purple-700 p-3 hover:text-white hover:bg-purple-700 active:ring-0 outline-none focus:ring-1 focus:ring-purple-500 text-purple-700 text-lg' to='/'>Try Again</Link>
      </div>
    </div>
  )
}

export default NotFound