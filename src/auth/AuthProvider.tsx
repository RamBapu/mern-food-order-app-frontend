import { Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Unable to initialize Auth0")
  }

  const onRedirectCallback = (): void => {
    navigate("/auth-callback")
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri, audience }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider
