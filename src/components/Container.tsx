interface IChildrenProps {
  children: React.ReactNode
  styles?: string
}

const Container = ({ children, styles }: IChildrenProps) => {
  return (
    <div className={`${styles} py-6 grid place-items-center bg-slate-50 border border-slate-300 rounded-lg shadow-md`}>
      {children}
    </div>
  )
}

export default Container