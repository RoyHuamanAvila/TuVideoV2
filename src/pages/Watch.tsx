import { useEffect, useState } from "react"
import ButtonSubscribe from "../components/ButtonSubscribe"
import Comments from "../components/Comments"
import VideoItem from "../components/VideoItem"
import { Video } from "../interfaces"
import { useParams } from "react-router-dom"
import axios from "axios"

const Watch = () => {
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

    return (
        <>
            {
                video ? (
                    <div className="watch pt-4 gap-4">
                        <div className="watch-section-1">
                            <div className="bg-black watch-video">
                                <video className="w-100 h-auto" src={video.url} controls></video>
                            </div>
                            <p className="pt-2 fs-5 fw-semibold">{video.title}</p>
                            <div className="d-flex border-bottom">
                                <p className="text-light">4,004,025 views</p>
                            </div>
                            <div className="d-flex pt-3 gap-3 border-bottom">
                                <div className="channel-logo--m overflow-hidden">
                                    <img className="channel-logo-img" src={video.owner?.logo as string} alt="" />
                                </div>
                                <div className="w-100">
                                    <div className="d-flex gap-3 justify-content-between">
                                        <div>
                                            <p className="channel-name">{video.owner?.name}</p>
                                            <p className="channel-subscriberscount--m">500,000 subscribers</p>
                                        </div>
                                        <div>
                                            <ButtonSubscribe />
                                        </div>
                                    </div>
                                    <p className="video-description pt-3">
                                        {video.description}
                                    </p>
                                </div>
                            </div>
                            <Comments videoID={video._id} />
                        </div>
                        <div className="watch-videolist">
                            {
                                listVideo?.map((video, index) => <VideoItem key={index} data={video} orientation="horizontal" />)
                            }
                        </div>
                    </div>
                ) : (
                    <p>Plceholder</p>
                )
            }
        </>
    )
}

export default Watch
