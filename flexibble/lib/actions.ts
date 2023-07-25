import { ProjectForm } from "@/common.types"
import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
  projectsQuery,
} from "@/graphql"
import { link } from "fs"
import { GraphQLClient } from "graphql-request"

//@ts-ignore
const isProduction = process.env.NODE_ENV === "prodcution"

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql"

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein"

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000"

const client = new GraphQLClient(apiUrl)

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables)
  } catch (error) {
    throw error
  }
}

export const getUser = (email: String) => {
  client.setHeader("x-api-key", apiKey)
  return makeGraphQLRequest(getUserQuery, { email })
}

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey)
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  }
  return makeGraphQLRequest(createUserMutation, variables)
}

export const fetchToken = async () => {
  try {
    const respone = await fetch(`${serverUrl}/api/auth/token`)
    return respone.json()
  } catch (error) {
    throw error
  }
}

export const uploadImage = async (imagePath: string) => {
  try {
    const respone = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    })
    return respone.json()
  } catch (error) {
    throw error
  }
}

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image)

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`)

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    }

    return makeGraphQLRequest(createProjectMutation, variables)
  }
}

export const fetchAllProjects = async (
  category?: string,
  endcursor?: string
) => {
  client.setHeader("x-api-key", apiKey)

  return makeGraphQLRequest(projectsQuery, { category, endcursor })
}
