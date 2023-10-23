export function Tags({ tags }: { tags: string[] }) {
  return (
    <div>
      <p className="font-medium text-gray-900 mb-2">Áreas de Atuação:</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-900 text-white text-xs font-medium py-1 px-2 rounded-lg uppercase"
          >
            {tag.toLocaleLowerCase()}
          </span>
        ))}
      </div>
    </div>
  )
}
