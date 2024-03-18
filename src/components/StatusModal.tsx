import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'

interface IStatusModal {
  errorText: string
  icon: IconDefinition
  styles: string
}

export const StatusModal = ({ errorText, icon, styles }: IStatusModal) => {
  return (
    <div className={`text-center p-2 ${styles}`}>
      <span className="p-4 font-semibold">{errorText}</span>
      <FontAwesomeIcon className="" icon={icon} />
    </div>
  )
}
