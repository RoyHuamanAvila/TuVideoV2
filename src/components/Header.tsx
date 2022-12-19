import { Link } from "react-router-dom"
import SignInButton from "./SignInButton"
import { useAuth0 } from '@auth0/auth0-react'
import { Logout, YourChannelOutline } from './Icons';

const Header = () => {
    const { isAuthenticated, logout, user } = useAuth0()

    const handleLogout = () => {
        logout({
            returnTo: window.location.origin
        })
    }

    return (
        <div className="header d-flex justify-content-between py-2 px-2 bg-white me-3">
            <div className="header-section">
                <button className="btn" type="button" title="SideMenu">
                    <img src="icons/Menu.svg" alt="menu button" />
                </button>
                <Link to='/' className="h-100 d-block ps-4">
                    <img className="h-100 w-auto" src="images/Logo.svg" alt="logo" />
                </Link>
            </div>
            <div className="header-section gap-2">
                <div className="ps-2 rounded-pill border overflow-hidden">
                    <input className="border-0 h-100" type="text" placeholder="Search" />
                </div>
                <button className="btn" title="Microphone">
                    <img className="align-self-center" src="icons/Microphone.svg" alt="" />
                </button>
            </div>
            <div className="header-section">
                {
                    isAuthenticated ?
                        <>
                            <button className="btn" type="button" title="Upload Video">
                                <img src="icons/UploadVideo.svg" alt="" />
                            </button>
                            <button className="btn" type="button" title="Notifications">
                                <img src="icons/Notify.svg" alt="" />
                            </button>
                            <div className="dropdown">
                                <button className="btn dropdown-circle h-100 ps-2 p-0" type="button" title="User" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="h-100 w-auto rounded-circle" src={user?.picture} alt="" />
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="d-flex align-items-start gap-3 px-3 py-2 border-bottom mb-2">
                                            <img className="user-logo--sm rounded-circle" src={user?.picture} alt="" />
                                            <div>
                                                <p className="text-capitalize m-0">{user?.nickname}</p>
                                                <p className="text-light m-0">{user?.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link to='/channel' className="dropdown-item pb-2"><YourChannelOutline /> Your Channel</Link></li>
                                    <li><button onClick={handleLogout} className="dropdown-item" title="Logout"><Logout /> Exit</button></li>
                                </ul>
                            </div>
                        </>
                        :
                        <SignInButton />
                }
            </div>
        </div>
    )
}

export default Header
