import { Link } from 'react-router-dom';
import './Header.scss';
import { SigInButton } from '../Buttons';
import { FC } from 'react';
import { User } from '@auth0/auth0-react';

interface HeaderViewProps {
  isAuthenticated: boolean;
  user?: User;
  logout: () => void;
}

const HeaderView: FC<HeaderViewProps> = ({ isAuthenticated, user, logout }) => {
  return (
    <header className='px-3 py-2 d-flex align-items-center justify-content-between bg-background'>
      <div className="d-flex align-items-center">
        <i className="bi bi-list fs-4 px-2 text-grey-600 d-none d-md-block"></i>
        <Link to='/'>
          <img className='px-md-3' src="/icons/TuVideoIcon.svg" alt="Logo TuVideo" />
        </Link>
      </div>
      {
        isAuthenticated ?
          <button className='dropdown-toggle Header__User-Picture-toggle no-arrow' type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={user?.picture} className='Header__User-Picture' alt="User picture" />
          </button> : <SigInButton />
      }
      <ul className="dropdown-menu">
        <li><a className="dropdown-item">Mi Canal</a></li>
        <li><a className="dropdown-item" onClick={logout}>Cerrar Sesión</a></li>
      </ul>
    </header>
  )
}

export default HeaderView
