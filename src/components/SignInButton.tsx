import { useAuth0 } from '@auth0/auth0-react'

const SignInButton = () => {
    const { loginWithRedirect } = useAuth0()

    const handleLogin = () => {
        loginWithRedirect()
    }

    return (
        <button onClick={handleLogin} className="btn rounded-pill d-flex gap-2 align-items-center border px-3" title="Sign In">
            <img src="/icons/LoginUserIcon.svg" alt="" />
            <p className="text-primary m-0">Sign In</p>
        </button>
    )
}

export default SignInButton
