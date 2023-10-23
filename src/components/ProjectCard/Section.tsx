export function Section({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-gray-700 font-medium">{title}</p>
      <div className="space-y-6">{children}</div>
    </div>
  )
}
