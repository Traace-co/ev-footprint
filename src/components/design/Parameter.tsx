export function Parameter(props: { title: string, children: React.ReactNode }) {
  return <div className="flex flex-col gap-1 flex-grow">
    <div className="font-medium">
      {props.title}
    </div>
    <div className="flex-grow">
      {props.children}
    </div>
  </div>
}
