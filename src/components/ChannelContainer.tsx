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
    const getPathImage = (image: File | string) => {
        if (image instanceof File) {
            return URL.createObjectURL(image)
        }
        return image;
    }
    const handleEditChannel = (e: React.FormEvent<HTMLInputElement>) => setChannel({ ...channel, [e.currentTarget.name]: e.currentTarget.value })
    const handleCancelChanges = () => {
        toggleEditMode();
        setChannel(initialData);
    }
    const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const image = e.currentTarget.files[0];
            setChannel({ ...channel, [e.currentTarget.name]: image })
        }
    }
    const ButtonSaveChanges = () => {
        const [isLoading, setIsLoading] = useState(false);

        const handleSaveChanges = async () => {
            const formData = new FormData();
            setIsLoading(true)
            for (const [key, value] of Object.entries(channel)) {
                formData.append(key, value);
            }
            try {
                const token = localStorage.getItem('token')
                const response = await axios.request({
                    url: `${import.meta.env.VITE_DOMAIN_BD}/channel`,
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData
                });
                setChannel(response.data);
                toggleEditMode();
                setInitialData(response.data);
                toast('Updated channel succesful', {
                    type: 'success'
                })
                setIsLoading(false);
                console.log(response.data);
            } catch (error) {
                console.log(error, 'error-2');
            }
        }

        return (
            <button onClick={handleSaveChanges} className="btn btn-confirm rounded-0 text-white">
                {
                    isLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden fs-6">Loading...</span>
                        </div>
                    ) : (
                        <>Save Changes</>
                    )
                }
            </button>
        )
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
                            channel?.banner &&
                            <div className="banner overflow-hidden position-relative">
                                {
                                    editMode && (
                                        <>
                                            <div className="bg-light position-absolute opacity-25 top-0 start-0 end-0 bottom-0">
                                            </div>
                                            <div className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute">
                                                <i className="bi bi-card-image fs-3 text-white"></i>
                                            </div>
                                            <input className="change-image" type="file" name="banner" title="Change banner" onChange={handleChangeImage} accept="image/*" />
                                        </>
                                    )
                                }
                                <img className="img-fluid" src={getPathImage(channel.banner)} alt="banner" />
                            </div>
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
                                                <input className="change-image" type="file" name="logo" title="Change logo" onChange={handleChangeImage} accept="image/*" />
                                            </>
                                        )
                                    }
                                    <img className="img-fluid" src={getPathImage(channel.logo)} alt="" />
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
                                                <button data-bs-toggle="modal" data-bs-target="#addComponentModal" className="btn btn-add rounded-0 text-white">Add Component</button>
                                                <ButtonSaveChanges />
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
                            <NavLink className='text-decoration-none text-uppercase tab-channel fw-semi-bold' to={`/channel/${id}/videos`}>VIDEOS</NavLink>
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
            <div>
                <div className="modal fade" id="addComponentModal" tabIndex={-1} aria-labelledby="addComponentModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add component</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex flex-column gap-2">
                                <div className="border px-3 py-2 d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex align-items-center rounded-circle bg-light bg-opacity-25 p-3 d-inline-block me-2" style={{ width: '50px', height: '50px' }}>
                                            <i className="bi bi-card-image text-light"></i>
                                        </div>
                                        <div>
                                            <p className="fs-5">Banner</p>
                                            <p className="text-light">Add a banner to your channel</p>
                                        </div>
                                    </div>
                                    <button className="btn border-0 text-primary position-relative">
                                        {
                                            channel?.banner ? (
                                                <>
                                                    Remove <i className="bi bi-trash3"></i>
                                                </>
                                            ) : (
                                                <>
                                                    Add <i className="bi bi-plus"></i>
                                                    <input type="file" name="banner" className="change-image" onChange={handleChangeImage} />
                                                </>
                                            )
                                        }
                                    </button>
                                </div>
                                <div className="border px-3 py-2 d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex align-items-center rounded-circle bg-light bg-opacity-25 p-3 d-inline-block me-2" style={{ width: '50px', height: '50px' }}>
                                            <i className="bi bi-film text-light"></i>
                                        </div>
                                        <div>
                                            <p className="fs-5">Video Presentation</p>
                                            <p className="text-light">Feature a video for your subscribers to watch.</p>
                                        </div>
                                    </div>
                                    <button className="btn border-0 text-primary">Add</button>
                                </div>
                            </div>
                            {/*                             <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-confirm text-white">Save changes</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChannelContainer
