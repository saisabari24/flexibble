import { ProjectInterface, UserProfile } from "@/common.types"
import Image from "next/image"

import Link from "next/link"
import Button from "./Button"
import ProjectCard from "./ProjectCard"

type Props = {
  user: UserProfile
}

const ProfilePage = ({ user }: Props) => (
  <section className="flexCenter paddings mx-auto w-full max-w-10xl flex-col">
    <section className="flexBetween w-full gap-10 max-lg:flex-col">
      <div className="flex w-full flex-col items-start">
        <Image
          src={user?.avatarUrl}
          width={100}
          height={100}
          className="rounded-full"
          alt="user image"
        />
        <p className="mt-10 text-4xl font-bold">{user?.name}</p>
        <p className="mt-5 max-w-lg text-3xl font-extrabold md:mt-10 md:text-5xl">
          I’m a Software Engineer
          <br />@ Bank of America 👋
        </p>

        <div className="mt-8 flex w-full flex-wrap gap-5">
          <Button
            title="Follow"
            leftIcon="/plus-round.svg"
            bgColor="bg-light-white-400 !w-max"
            textColor="text-black-100"
          />
          <Link href={`mailto:${user?.email}`}>
            <Button title="Hire Me" leftIcon="/email.svg" />
          </Link>
        </div>
      </div>

      {user?.projects?.edges?.length > 0 ? (
        <Image
          src={user?.projects?.edges[0]?.node?.image}
          alt="project image"
          width={739}
          height={554}
          className="rounded-xl object-contain"
        />
      ) : (
        <Image
          src="/profile-post.png"
          width={739}
          height={554}
          alt="project image"
          className="rounded-xl"
        />
      )}
    </section>

    <section className="flexStart mt-16 w-full flex-col lg:mt-28">
      <p className="w-full text-left text-lg font-semibold">Recent Work</p>

      <div className="profile_projects">
        {user?.projects?.edges?.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={user.name}
            avatarUrl={user.avatarUrl}
            userId={user.id}
          />
        ))}
      </div>
    </section>
  </section>
)

export default ProfilePage
