import { ReactNode } from "react";

export function SectionTitle(props: { title: ReactNode, level: 1 | 2 | 3, icon?: string }) {
  const { level, icon, title } = props

  let heading: ReactNode

  switch (level) {
    case 1:
      heading = <h1 className='text-4xl	font-medium'>{title}</h1>
      break
    case 2:
      heading = <h2 className='text-4xl	font-medium'>{title}</h2>
      break
    case 3:
      heading = <h3 className='text-3xl	font-medium'>{title}</h3>
      break
    default:
      break
  }

  return <div className="flex flex-row gap-4 items-center mb-4">
    {icon &&
      <div>
        <img src={icon} alt='' />
      </div>
    }
    {heading}
  </div>
}