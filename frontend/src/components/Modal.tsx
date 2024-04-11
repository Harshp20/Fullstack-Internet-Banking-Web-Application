import { IModal } from '../types/interfaces'

const Modal = ({ children, styles, title }: IModal) => {
  return (
    <div className={`${styles} absolute inset-0 grid place-items-center bg-black/50`}>
      <div className="w-[30%] bg-purple-50 rounded-md">
        <div className='flex flex-row items-center justify-between bg-purple-700 text-white relative top-0 px-8 py-2 rounded-t-md'>
          <div className="w-full flex flex-row items-center justify-between">
            <span className='text-2xl capitalize'>{title}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal