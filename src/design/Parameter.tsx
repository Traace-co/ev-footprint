export function Parameter(props: { title: string, children: React.ReactNode }) {
  return <div className="flex flex-row items-center gap-2">
    <div className="shrink-0">
      {props.title}
    </div>
    <div className="flex-grow">
      {props.children}
    </div>
  </div>
}