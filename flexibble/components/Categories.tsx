"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { categoryFilters } from "@/constants"

const Categories = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const category = searchParams.get("category")

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`)
  }

  return (
    <div className="flexBetween w-full flex-wrap gap-5">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } whitespace-nowrap rounded-lg px-4 py-3 capitalize`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  )
}

export default Categories
