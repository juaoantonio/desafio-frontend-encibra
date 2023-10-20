export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8 w-full rounded-lg shadow-xl px-10 py-8 border border-gray-950/10">
      {children}
    </div>
  )
}
