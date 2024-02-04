import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux'
import HeaderView from './HeaderView'
import { RootState } from '../../app/store';

const HeaderContainer = () => {
  const { isAuthenticated, user, logout } = useAuth0();
  const { user_metadata } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
  }

  return <HeaderView isAuthenticated={isAuthenticated} user={user} logout={handleLogout} channelID={user_metadata?.channel} />
}

export default HeaderContainer
