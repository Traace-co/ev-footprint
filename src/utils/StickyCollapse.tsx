import { Collapse } from "antd";
import { ReactNode, useState } from "react";
import headerIcon2 from '../simulator/landingPage/headerIcon2.svg';
import { SectionTitle } from "../simulator/SectionTitle";
import arrow from './arrow.svg';
import { Sticky } from "./Sticky";

// Automatically collapses the content when the component becomes sticky
export function StickyCollapse(props: { children: ReactNode }) {

  const [isActive, setIsActive] = useState<boolean | undefined>(undefined)
  const [wasSticky, setWasSticky] = useState(false)

  return <Sticky>
    {isSticky => {
      if (isSticky) {
        setWasSticky(true)
      }
      const wasOrIsSticky = isSticky || wasSticky
      const shouldOpenPanel = isActive === undefined // undefined means that default behavior was not overridden
        ? !wasOrIsSticky // Remember if the component was sticky at least once, to prevent oscillation between states
        : isActive

      return <div className="mb-4 backdrop-blur py-4 rounded-md">
        <Collapse
          ghost
          expandIcon={({ isActive }) => (
            <div>
              <img src={arrow}
                className='transition'
                style={{ transform: isActive ? 'rotate(90deg)' : 'rotate(180deg)' }}
                alt='' />
            </div>
          )}
          expandIconPosition='right'
          onChange={onChange => {
            setIsActive(onChange.length > 0)
          }}
          activeKey={shouldOpenPanel ? ['parameters'] : []}>
          <Collapse.Panel key='parameters'
            style={{ paddingLeft: '-20px' }}
            header={
              <SectionTitle title='Select vehicles and adjust parameters' level={2} icon={headerIcon2} />
            } >
            {props.children}
          </Collapse.Panel>
        </Collapse>
      </div>
    }
    }

  </Sticky>
}