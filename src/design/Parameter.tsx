export function Parameter(props: { title: string, children: React.ReactNode }) {
  return <div className="flex flex-row gap-2">
    <div>
      {props.title}
    </div>
    <div>
      {props.children}
    </div>
  </div>
}