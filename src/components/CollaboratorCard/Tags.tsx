export function Tags({ tags }: { tags: string[] }) {
  return (
    <div>
      <p className="font-medium text-gray-900 mb-2">Áreas de Atuação:</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-3 py-1 rounded-2xl bg-violet-400 text-violet-950 font-medium capitalize text-sm"
          >
            {tag.toLocaleLowerCase()}
          </span>
        ))}
      </div>
    </div>
  )
}
