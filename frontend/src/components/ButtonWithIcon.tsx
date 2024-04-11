import { IconDefinition } from "@fortawesome/fontawesome-common-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface IButtonWithIcon {
  btnText: string
  icon?: IconDefinition
  btnClasses?: string
  textClasses?: string
  iconClasses?: string
}

export default function ButtonWithIcon({ btnText, icon, btnClasses, textClasses, iconClasses }: IButtonWithIcon) {
  return (
    <button className={`flex flex-row gap-2 items-center justify-center  ${btnClasses}`}>
      <span className={textClasses}>{btnText}</span>
      {icon && <FontAwesomeIcon className={`${iconClasses}`} icon={icon} />}
    </button>)
}