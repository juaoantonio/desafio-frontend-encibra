export function Contact({ phone, email }: { phone: string; email: string }) {
  return (
    <div className="space-y-1 text-sm text-gray-700 font-medium">
      <p>
        <strong>Telefone:</strong> {phone}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
    </div>
  )
}
