interface DebuggerProps<T> {
  data: T
}
export function Debugger<T>({data}: DebuggerProps<T>) {
  return (
    <div className="h-1/2 fixed top-0 text-white bg-black opacity-75 rounded-md p-2.5">
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
