"use client"
import { SessionInterface } from "@/common.types"
import { ChangeEvent } from "react"
import Image from "next/image"
import FormField from "./FormField"
type Props = {
  type: string
  session: SessionInterface
}
const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {}
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {}

  const handleStateChange = (fieldName: string, value: string) => {}

  const form = {
    image: "",
    title: "",
  }
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="z-20 object-contain sm:p-10"
            alt="project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
    </form>
  )
}

export default ProjectForm
