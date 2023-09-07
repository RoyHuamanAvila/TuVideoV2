import { FC, ReactNode } from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom';

const NavbarView = () => {
  return (
    <nav id='navbar'>
      <NavItem label='Principal' to='/'>
        <img src="/icons/icon-home.svg" alt="Home Icon" />
      </NavItem>
      <img className='d-md-none' src="/icons/icon-add-circled-outline.svg" alt="Add icon" />
      <NavItem label='Suscripciones' to='/subs'>
        <img src="/icons/SubsOutline.svg" alt="Subs icon" />
      </NavItem>
    </nav>
  )
}

interface NavItemProps {
  children: ReactNode;
  label: string;
  to: string;
}
const NavItem: FC<NavItemProps> = ({ children, to, label }) => {
  return (
    <NavLink to={to} className='nav-item'>
      {children}
      <p>{label}</p>
    </NavLink>
  )
}

export default NavbarView
