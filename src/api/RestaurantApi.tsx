import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"
import { Restaurant } from "../types/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      // Here we don't do JSON.stringify because we have done that manually
      body: restaurantFormData,
    })

    if (!response.ok) {
      throw new Error("Failed to create restaurant")
    }

    // Returning the response data with _id, user, lastUpdated fields
    return response.json()
  }

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest)

  if (isSuccess) {
    toast.success("Restaurant created!")
  }

  if (error) {
    toast.error("Unable to update restaurant")
  }

  return { createRestaurant, isLoading }
}
