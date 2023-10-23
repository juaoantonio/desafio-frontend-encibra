export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return <h1>Detalhes do Projeto {params.id}</h1>
}
