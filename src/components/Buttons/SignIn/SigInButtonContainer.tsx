import { useAuth0 } from "@auth0/auth0-react";
import SignInButtonView from "./SignInButtonView";

const SigInButtonContainer = () => {
  const { loginWithRedirect } = useAuth0();

  return <SignInButtonView loginWithRedirect={loginWithRedirect} />
}

export default SigInButtonContainer
