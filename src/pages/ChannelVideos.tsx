import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Video } from '../interfaces'
import VideoItem from '../components/VideoItem'

const ChannelVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const { id } = useParams();

    const getVideos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DOMAIN_BD}/video/${id}`);
            setVideos(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <div className="row justify-content-start px-5 px-sm-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            {
                videos.map(video => <VideoItem orientation='vertical' data={video} />)
            }
        </div>
    )
}

export default ChannelVideos
