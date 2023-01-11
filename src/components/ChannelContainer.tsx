import { NavLink, Outlet, useParams } from "react-router-dom"
import ButtonSubscribe from "./ButtonSubscribe"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Channel, UserData } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toast } from 'react-toastify';

const ChannelContainer = () => {
    const { id } = useParams();
    const [initialData, setInitialData] = useState<Channel>({} as Channel);
    const [channel, setChannel] = useState<Channel>({} as Channel);
    const [editMode, setEditMode] = useState<boolean>(false);
    const user: UserData = useSelector((state: RootState) => state.user);

    const axiosGetChannelData = async () => {
        try {
            const url = `${import.meta.env.VITE_DOMAIN_BD}/channel/${id}`
            const token = localStorage.getItem('token');
            const response = await axios.request({
                url,
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json'
                }
            })
            setChannel(response.data);
            setInitialData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyOwner = () => user?.user_metadata?.channel === id;
    const toggleEditMode = () => setEditMode(!editMode);
    const handleEditChannel = (e: React.FormEvent<HTMLInputElement>) => setChannel({ ...channel, [e.currentTarget.name]: e.currentTarget.value })
    const handleCancelChanges = () => {
        toggleEditMode();
        setChannel(initialData);
    }
    const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const image = e.currentTarget.files[0];
            const UrlImage = URL.createObjectURL(image);
            setChannel({ ...channel, [e.currentTarget.name]: UrlImage })
        }
    }
    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.request({
                url: `${import.meta.env.VITE_DOMAIN_BD}/channel`,
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                data: channel
            });
            setChannel(response.data);
            toggleEditMode();
            setInitialData(response.data);
            toast('Updated channel succesful', {
                type: 'success'
            })
        } catch (error) {
            console.log(error, 'error-2');
        }
    }

    useEffect(() => {
        axiosGetChannelData();
    }, [id])

    return (
        <div className="channel-container bg-white">
            {
                channel.name ? (
                    <>
                        {
                            channel?.banner && <div className="banner"></div>
                        }
                        <div className="d-flex justify-content-between align-items-center px-4 py-3">
                            <div className="d-flex">
                                <div className="channel-logo--lg overflow-hidden position-relative d-flex align-items-center">
                                    {
                                        editMode && (
                                            <>
                                                <div className="bg-light position-absolute opacity-25 top-0 start-0 end-0 bottom-0">
                                                </div>
                                                <div className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute">
                                                    <i className="bi bi-card-image fs-3 text-white"></i>
                                                </div>
                                                <input className="change-logo" type="file" name="logo" title="Change logo" onChange={handleChangeImage} />
                                            </>
                                        )
                                    }
                                    <img className="img-fluid" src={channel?.logo} alt="" />
                                </div>
                                <div className="ps-3">
                                    {
                                        editMode ? (
                                            <input className="fs-4" name="name" type="text" value={channel?.name} placeholder="New name" onChange={handleEditChannel} />
                                        ) : (
                                            <p className="fw-semi-bold fs-4">{channel?.name}</p>
                                        )
                                    }
                                    <p className="text-light">{`@${channel?.name}`}</p>
                                    <p className="text-light">120M subscribers</p>
                                </div>
                            </div>
                            <div>
                                {
                                    verifyOwner() ? (
                                        editMode ? (
                                            <div className="d-flex flex-column gap-2">
                                                <button className="btn btn-add rounded-0 text-white">Add Component</button>
                                                <button onClick={handleSaveChanges} className="btn btn-confirm rounded-0 text-white">Save Changes</button>
                                                <button onClick={handleCancelChanges} className="btn btn-cancel text-white rounded-0">Cancel Changes</button>
                                            </div>
                                        ) : (
                                            <button onClick={toggleEditMode} className="btn btn-secondary text-white rounded-0">Edit Channel</button>
                                        )
                                    ) : (
                                        <ButtonSubscribe />
                                    )
                                }
                            </div>
                        </div>
                        <div className="d-flex px-4 border-bottom">
                            <NavLink className='text-decoration-none text-uppercase tab-channel fw-semi-bold' to={`/channel/${id}`}>HOME</NavLink>
                        </div>
                        <div className="px-4">
                            <Outlet />
                        </div>
                    </>
                ) : (
                    <div className="px-4 py-3">
                        <div className="d-flex align-items-center">
                            <div className="channel-logo--lg placeholder"></div>
                            <div className="placeholder-glow ps-3 d-flex flex-column gap-2">
                                <p className="placeholder-lg placeholder" style={{ width: '200px' }}></p>
                                <p className="placeholder-sm placeholder" style={{ width: '150px' }}></p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ChannelContainer
