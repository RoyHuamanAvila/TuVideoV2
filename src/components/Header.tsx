import { Link, useNavigate } from "react-router-dom"
import SignInButton from "./SignInButton"
import { useAuth0 } from '@auth0/auth0-react'
import { Logout, YourChannelOutline } from './Icons';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { MyChannel } from "../interfaces";
import { useDispatch } from "react-redux";
import { createChannel } from "../features/channel/channelSlice";
import React, { useState } from "react";

const Header = () => {
    const { isAuthenticated, logout, user } = useAuth0()
    const yourChannel: MyChannel = useSelector((state: RootState) => state.yourChannel)
    const [channelData, setChannelData] = useState<MyChannel>({ active: false, logo: '', name: '' });
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout({
            returnTo: window.location.origin
        })
    }

    const handleEnterData = (e: React.FormEvent<HTMLInputElement>) => {
        setChannelData({ ...channelData, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleCreateChannel = () => {
        dispatch(createChannel(channelData))
        navigate('/channel')
    }

    return (
        <>
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
                                        <li>
                                            {
                                                yourChannel.active ?
                                                    <Link to='/channel' className="dropdown-item pb-2">
                                                        <YourChannelOutline /> Your Channel
                                                    </Link> :
                                                    <button type="button" className="dropdown-item pb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        <YourChannelOutline /> Create Channel
                                                    </button>
                                            }
                                        </li>
                                        <li><button onClick={handleLogout} className="dropdown-item" title="Logout"><Logout /> Exit</button></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <SignInButton />
                    }
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Channel</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center">
                            <div className="channel-logo--xl bg-primary rounded-circle overflow-hidden mb-3">
                                <img className="img-fluid" src={user?.picture} alt="" />
                            </div>
                            <input type="text" placeholder="Name" name="name" onChange={(e) => handleEnterData(e)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn border-0 text-light" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-secondary text-white" onClick={handleCreateChannel} data-bs-dismiss="modal">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
