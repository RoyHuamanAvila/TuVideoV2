import { NavLink, Outlet } from "react-router-dom"
import ButtonSubscribe from "./ButtonSubscribe"

const ChannelContainer = () => {
    return (
        <div className="channel-container">
            <div className="banner"></div>
            <div className="d-flex justify-content-between align-items-center px-4 py-3">
                <div className="d-flex">
                    <div className="channel-logo--lg"></div>
                    <div className="ps-3">
                        <p className="fw-semi-bold fs-4">MrBeast</p>
                        <p className="text-light">@MrBeast</p>
                        <p className="text-light">120M subscribers</p>
                    </div>
                </div>
                <div>
                    <ButtonSubscribe />
                </div>
            </div>
            <div className="d-flex px-4 border-bottom">
                <NavLink className='text-decoration-none text-uppercase tab-channel fw-semi-bold' to='/channel'>HOME</NavLink>
            </div>
            <div className="px-4">
                <Outlet />
            </div>
        </div>
    )
}

export default ChannelContainer
