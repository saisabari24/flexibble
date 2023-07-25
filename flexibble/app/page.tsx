import { ProjectInterface } from "@/common.types"
import ProjectCard from "@/components/ProjectCard"
import { fetchAllProjects } from "@/lib/actions"

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[]
    pageInfo: {
      hasPreviousPage: boolean
      hasNextPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectSearch

  const projectsToDisplay = data?.projectSearch?.edges || []

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart paddings flex-col">
        Categories
        <p className="no-result-text text-center">
          No projects found, go create first.
        </p>
      </section>
    )
  }
  return (
    <section className="flex-start paddings mb-16 flex-col">
      <h1>Categories</h1>

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <h1>LoadMore</h1>
    </section>
  )
}

export default Home
