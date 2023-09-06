import { useEffect, useState } from "react";
import WatchView from "./WatchView"
import { Video } from "../../interfaces";
import { useParams } from "react-router-dom";
import axios from "axios";

const WatchContainer = () => {
  const [video, setVideo] = useState<Video>()
  const [listVideo, setListVideo] = useState<Video[]>();

  const { id } = useParams()

  const getVideo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_DOMAIN_BD}/video/${id}`);
      setVideo(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getListVideos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_DOMAIN_BD}/video`);
      setListVideo(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideo();
    getListVideos();
  }, [id])

  return video && <WatchView video={video} />
}

export default WatchContainer
