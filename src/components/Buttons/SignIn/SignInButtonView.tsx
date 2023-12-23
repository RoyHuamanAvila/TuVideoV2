import './SignInButton.scss'
import { FC } from 'react';

interface SignInButtonViewProps {
  loginWithRedirect: () => void;
}

const SignInButtonView: FC<SignInButtonViewProps> = ({ loginWithRedirect }) => {
  return (
    <button onClick={loginWithRedirect} className='sign-in-button'>
      <i className="bi bi-person-circle"></i>
      <p className='fs-6 m-0 d-none d-md-block'> Acceder</p>
    </button>
  )
}

export default SignInButtonView
