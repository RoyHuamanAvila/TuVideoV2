import { Link } from "react-router-dom"
import SignInButton from "./SignInButton"

const Header = () => {
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
            <div className="header-section">
                <div className="ps-2 rounded-pill border overflow-hidden">
                    <input className="border-0 h-100" type="text" placeholder="Search" />
                </div>
            </div>
            <div className="header-section">
                {/*                 <button className="btn" type="button" title="Upload Video">
                    <img src="icons/UploadVideo.svg" alt="" />
                </button>
                <button className="btn" type="button" title="Notifications">
                    <img src="icons/Notify.svg" alt="" />
                </button>
                <button className="btn" type="button" title="Notifications">
                    <img src="icons/Notify.svg" alt="" />
                </button> */}
                <SignInButton />
            </div>
        </div>
    )
}

export default Header
