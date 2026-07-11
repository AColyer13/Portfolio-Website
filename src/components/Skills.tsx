import { skillBlocks } from '../data/portfolio'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      variant="skills"
      headingClassName="flow-root mb-(--section-padding-y) mx-auto max-w-[40rem] text-start"
      contentClassName="mx-auto max-w-[40rem]"
    >
      <div className="flex flex-col gap-6">
        {skillBlocks.map((block) => (
          <div key={block.title}>
            <h3 className="m-0 mb-2 text-fluid-2 font-medium text-text-muted">
              {block.title}
            </h3>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-body text-text-default">
              {block.skills.map((skill) => (
                <li key={skill.name}>{skill.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
