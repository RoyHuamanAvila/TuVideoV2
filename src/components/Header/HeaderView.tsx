import { Link } from 'react-router-dom';
import './Header.scss';

const HeaderView = () => {
  return (
    <header className='px-3 d-flex align-items-center justify-content-between'>
      <Link to='/'>
        <img src="/icons/TuVideoIcon.svg" alt="Logo TuVideo" />
      </Link>
      <img src="/icons/icon-profile-circled.svg" alt="Icon Profile" />
    </header>
  )
}

export default HeaderView
