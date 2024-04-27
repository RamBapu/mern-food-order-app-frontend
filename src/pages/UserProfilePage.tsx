import { useGetUser, useUpdateUser } from "../api/UserApi"
import UserProfileForm from "../forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  const { currentUser, isLoading: isFetching } = useGetUser()
  const { updateUser, isLoading } = useUpdateUser()

  if (isFetching) return <span>Loading...</span>

  if(!currentUser) return <span>Unable to load User</span>

  return <UserProfileForm user={currentUser} onSave={updateUser} isLoading={isLoading} />
}

export default UserProfilePage
