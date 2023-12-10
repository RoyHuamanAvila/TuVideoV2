import { FC, ReactNode } from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom';

interface NavbarViewProps {
  hide: boolean;
}

const NavbarView: FC<NavbarViewProps> = ({ hide }) => {
  return (
    <nav id='navbar' className={`${hide && 'hide'}`}>
      <NavItem label='Principal' to='/'>
        <i className="bi bi-house"></i>
      </NavItem>
      <img className='d-md-none' src="/icons/icon-add-circled-outline.svg" alt="Add icon" />
      <NavItem label='Suscripciones' to='/subscribes'>
        <i className="bi bi-collection-play"></i>
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
    <NavLink to={to} className='nav-item fs-5'>
      {children}
      <p>{label}</p>
    </NavLink>
  )
}

export default NavbarView
