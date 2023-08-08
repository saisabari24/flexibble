"use client"

import { useRouter } from "next/navigation"

import Button from "./Button"

type Props = {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}

const LoadMore = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) => {
  const router = useRouter()

  const handleNavigation = (type: string) => {
    const currentParams = new URLSearchParams(window.location.search)

    if (type === "prev" && hasPreviousPage) {
      currentParams.delete("endcursor")
      currentParams.set("startCursor", startCursor)
    } else if (type === "next" && hasNextPage) {
      currentParams.delete("startCursor")
      currentParams.set("endCursor", endCursor)
    }

    const newSearchParams = currentParams.toString()
    const newPathname = `${window.location.pathname}?${newSearchParams}`

    router.push(newPathname)
  }

  return (
    <div className="flexCenter mt-10 w-full gap-5">
      {hasPreviousPage && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("prev")}
        />
      )}
      {hasNextPage && (
        <Button
          title="Next Shots"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  )
}

export default LoadMore
