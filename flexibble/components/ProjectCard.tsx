"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {
  id: string
  image: string
  title: string
  name: string
  avatarUrl: string
  userId: string
}

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
  const [randomLikes, setRandomLikes] = useState(0)
  const [randomViews, setRandomViews] = useState("")

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000))
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    )
  }, [])
  return (
    <div className="flexCenter drop-shadow-card flex-col rounded-2xl">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative h-full w-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="h-full w-full rounded-2xl object-cover"
          alt="Project Image"
        />
        <div className="profile__card-title hidden group-hover:flex">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flexBetween mt-3 w-full px-2 text-sm font-semibold">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="Profile Image"
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
