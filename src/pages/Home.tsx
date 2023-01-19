import { useEffect, useState } from "react"
import VideoItem from "../components/VideoItem"
import axios from "axios";
import { Video } from "../interfaces";

const Home = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    const getVideos = async () => {
        const response = await axios.get(`${import.meta.env.VITE_DOMAIN_BD}/video`);

        setVideos(response.data);
    }

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <div className="row justify-content-start px-5 px-sm-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            {
                videos.map((video) => <VideoItem orientation="vertical" data={video} />)
            }
        </div>
    )
}


export default Home
