export function Parameter(props: { title: string, children: React.ReactNode }) {
  return <div className="flex flex-col gap-1 text-gray-600 flex-grow">
    <div className="text-xs font-medium">
      {props.title}
    </div>
    <div className="flex-grow">
      {props.children}
    </div>
  </div>
}