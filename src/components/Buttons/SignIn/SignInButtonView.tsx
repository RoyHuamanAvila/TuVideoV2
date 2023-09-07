import { Link } from 'react-router-dom'
import './SignInButton.scss'

const SignInButtonView = () => {
  return (
    <Link to='/login' className='sign-in-button'>
      <i className="bi bi-person-circle"></i>
      <p className='fs-6 m-0 d-none d-md-block'> Acceder</p>
    </Link>
  )
}

export default SignInButtonView
