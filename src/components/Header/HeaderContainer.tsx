import { useAuth0 } from '@auth0/auth0-react';
import HeaderView from './HeaderView'

const HeaderContainer = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
  }

  return <HeaderView isAuthenticated={isAuthenticated} user={user} logout={handleLogout} />
}

export default HeaderContainer
