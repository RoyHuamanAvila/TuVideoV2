import { useAuth0 } from "@auth0/auth0-react"
import CreateChannelView from "./CreateChannelView"

const CreateChannelContainer = () => {
  const { user } = useAuth0();

  return (
    user ? <CreateChannelView user={user} /> : null
  )
}

export default CreateChannelContainer
