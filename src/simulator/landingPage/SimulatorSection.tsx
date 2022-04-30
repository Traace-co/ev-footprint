import { ReactNode } from "react";
import { SectionTitle } from "../SectionTitle";

export function SimulatorSection(props: { title: ReactNode, children: ReactNode, level: 1 | 2 | 3, icon?: string }) {
  const { children } = props

  return <div className="w-full">
    <SectionTitle {...props} />
    {children}
  </div>
}