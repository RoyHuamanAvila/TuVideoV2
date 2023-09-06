import { useEffect, useState } from "react"
import { VideoCard, VideoCardPlaceholder } from "../components"
import axios from "axios";
import { Video } from "../interfaces";

const Home = () => {
    const [videos, setVideos] = useState<Video[]>();

    const getVideos = async () => {
        console.log(import.meta.env.VITE_DOMAIN_BD)
        const response = await axios.get(`${import.meta.env.VITE_DOMAIN_BD}/video`);
        setVideos(response.data);
    }

    const getPlaceholders = () => {
        const arrayPlaceholder = Array.from({ length: 8 }, (_, index) => (
            <VideoCardPlaceholder key={index} />
        ));
        return arrayPlaceholder;
    };

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <div className="">
            {
                videos ? videos.map(video => <VideoCard data={video} key={video._id} />) : getPlaceholders()
            }
        </div>
    )
}


export default Home
