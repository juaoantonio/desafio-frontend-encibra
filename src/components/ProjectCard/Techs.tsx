export function Techs({ techs }: { techs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.map((tech) => (
        <span
          key={tech}
          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  )
}
