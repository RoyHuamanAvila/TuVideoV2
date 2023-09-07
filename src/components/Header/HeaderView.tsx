import { Link } from 'react-router-dom';
import './Header.scss';

const HeaderView = () => {
  return (
    <header className='px-3 d-flex align-items-center justify-content-between bg-background'>
      <div className="d-flex align-items-center">
        <i className="bi bi-list fs-4 px-2 text-grey-600 d-none d-md-block"></i>
        <Link to='/'>
          <img className='px-md-3' src="/icons/TuVideoIcon.svg" alt="Logo TuVideo" />
        </Link>
      </div>
      <img src="/icons/icon-profile-circled.svg" alt="Icon Profile" />
    </header>
  )
}

export default HeaderView
