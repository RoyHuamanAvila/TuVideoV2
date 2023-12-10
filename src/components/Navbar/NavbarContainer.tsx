import { useEffect, useState } from 'react';
import NavbarView from './NavbarView'
import { useLocation } from 'react-router-dom'

const NavbarContainer = () => {
  const location = useLocation();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const shouldHide = location.pathname.includes('watch');
    if (hide !== shouldHide) setHide(shouldHide);
  }, [location])
  return <NavbarView hide={hide} />
}

export default NavbarContainer
