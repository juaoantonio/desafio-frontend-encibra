import { CreateCollaboratorForm } from './components/CreateCollaboratorForm'
import { PrivateRoute } from '@/components/PrivateRoute'

export default function createCollaboratorPage() {
  return (
    <PrivateRoute>
      <div className="flex items-center justify-center min-h-screen py-10">
        <CreateCollaboratorForm />
      </div>
    </PrivateRoute>
  )
}
