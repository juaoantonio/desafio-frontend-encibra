export default function CollaboratorDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return <h1>Detalhes do Colaborador {params.id}</h1>
}
