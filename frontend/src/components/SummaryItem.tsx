export interface ISummaryItem {
  title: string
  text: string
  textStyles?: string
  mainStyles?: string
}

const SummaryItem = ({ title, text, textStyles, mainStyles }: ISummaryItem) => {
  return (
    <p className={`text-xl grid items-center text-left odd:grid-cols-account-summary-item-col-9ch even:grid-cols-account-summary-item-col-15ch ${mainStyles}`}>
      <span className='font-thin'>{title}</span>
      <span className={textStyles || 'text-purple-700'} >{text}</span>
    </p>
  )
}

export default SummaryItem