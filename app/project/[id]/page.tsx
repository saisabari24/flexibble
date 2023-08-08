import Image from "next/image"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { getProjectDetails } from "@/lib/actions"
import Modal from "@/components/Modal"
// import ProjectActions from "@/components/ProjectActions"
import RelatedProjects from "@/components/RelatedProjects"
import { ProjectInterface } from "@/common.types"
import ProjectActions from "@/components/ProjectActions"
// import ProjectActions from "@/components/ProjectActions"

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser()
  const result = (await getProjectDetails(id)) as { project?: ProjectInterface }

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>

  const projectDetails = result?.project

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`

  return (
    <Modal>
      <section className="flexBetween w-full max-w-4xl gap-y-8 max-xs:flex-col">
        <div className="flex w-full flex-1 items-start gap-5 max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flexStart flex-1 flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {projectDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>{projectDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="font-semibold text-primary-purple"
              >
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex items-center justify-end gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${projectDetails?.image}`}
          className="rounded-2xl object-cover"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter mt-20 flex-col">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails?.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter tex-sm gap-2 font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter tex-sm gap-2 font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter mt-28 w-full gap-8">
        <span className="h-0.5 w-full bg-light-white-200" />
        <Link href={renderLink()} className="h-[82px] min-w-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="h-0.5 w-full bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={projectDetails?.createdBy?.id}
        projectId={projectDetails?.id}
      />
    </Modal>
  )
}

export default Project
