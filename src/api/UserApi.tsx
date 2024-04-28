import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"
import { User } from "../types/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }

    return response.json()
  }

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchUser", getUserRequest)

  if (error) {
    toast.error(error.toString())
  }

  return { currentUser, isLoading }
}

type CreateUserRequest = {
  auth0Id: string
  email: string
}

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error("Failed to create user")
    }
  }

  const {
    mutate: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest)

  return { createUser, isLoading, isError, isSuccess }
}

type UpdateUserRequest = {
  name: string
  address: string
  city: string
  country: string
}

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Failed to update user")
    }
  }

  const {
    mutate: updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation(updateUserRequest)

  if (isSuccess) {
    toast.success("User updated successfully")
  }

  if (isError && error) {
    toast.error(error.toString())
    reset()
  }

  return { updateUser, isLoading }
}
