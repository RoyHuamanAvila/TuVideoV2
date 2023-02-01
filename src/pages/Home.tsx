import { useEffect, useState } from "react"
import VideoItem from "../components/VideoItem"
import axios from "axios";
import { Channel, Video } from "../interfaces";

const Home = () => {
    const [videos, setVideos] = useState<Video[]>();

    const emptyData: Video = {
        _id: '',
        title: '',
        description: '',
        owner: {} as Channel,
        thumbnail: '',
        url: '',
    }

    const getVideos = async () => {
        const response = await axios.get(`${import.meta.env.VITE_DOMAIN_BD}/video`);

        setVideos(response.data);
    }

    const videosPlaceholder = () => {
        const placeHolders: Video[] = [];
        for (let i = 0; i < 8; i++) {
            placeHolders[i] = emptyData;
        }

        return placeHolders.map((video, index) => <VideoItem key={index} orientation="vertical" />);
    }

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <div className="row justify-content-start px-5 px-sm-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
            {
                videos ? (
                    videos.map((video, index) => <VideoItem key={index} orientation="vertical" data={video} />)
                ) : (
                    videosPlaceholder()
                )
            }
        </div>
    )
}


export default Home
