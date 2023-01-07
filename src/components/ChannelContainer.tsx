import { NavLink, Outlet, useParams } from "react-router-dom"
import ButtonSubscribe from "./ButtonSubscribe"
import { useEffect, useState } from "react";
import axios from "axios";
import { Channel, UserData } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ChannelContainer = () => {
    const { id } = useParams();
    const [channel, setChannel] = useState<Channel>();
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
        } catch (error) {
            console.log(error);
        }
    }

    const verifyOwner = () => user.user_metadata.channel === id;

    useEffect(() => {
        axiosGetChannelData();
    }, [id])

    return (
        <div className="channel-container">
            {
                channel?.banner && <div className="banner"></div>
            }
            <div className="d-flex justify-content-between align-items-center px-4 py-3">
                <div className="d-flex">
                    <div className="channel-logo--lg overflow-hidden">
                        <img className="img-fluid" src={channel?.logo} alt="" />
                    </div>
                    <div className="ps-3">
                        <p className="fw-semi-bold fs-4">{channel?.name}</p>
                        <p className="text-light">{`@${channel?.name}`}</p>
                        <p className="text-light">120M subscribers</p>
                    </div>
                </div>
                <div>
                    {
                        verifyOwner() ? <button className="btn btn-confirm text-white rounded-0">Edit Channel</button> : <ButtonSubscribe />
                    }
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
