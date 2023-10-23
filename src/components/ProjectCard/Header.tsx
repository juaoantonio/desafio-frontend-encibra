export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-10">{children}</div>
  )
}
