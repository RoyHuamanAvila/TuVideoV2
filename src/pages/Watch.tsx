import { useEffect, useState } from "react"
import ButtonSubscribe from "../components/ButtonSubscribe"
import Comments from "../components/Comments"
import VideoItem from "../components/VideoItem"
import { Video } from "../interfaces"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { LikeButton } from "../components/LikeButton"

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
                    <div className="watch px-3 pt-4 mx-lg-5 mx-xxl-auto">
                        <div className="col-12 col-lg-8">
                            <div className="bg-black">
                                <video className="w-100 h-auto" src={video.url} controls></video>
                            </div>
                            <p className="pt-2 fs-5 fw-semibold">{video.title}</p>
                            <div className="d-flex flex-wrap flex-sm-nowrap gap-3">
                                <div className="d-flex gap-3 justify-content-between w-100">
                                    <div className="d-flex gap-3">
                                        <Link to={`/channel/${video.owner._id}`} className="channel-logo--m overflow-hidden">
                                            <img className="channel-logo-img" src={video.owner?.logo as string} alt="" />
                                        </Link>
                                        <div>
                                            <Link to={`/channel/${video.owner._id}`} className="channel-name">{video.owner?.name}</Link>
                                            <p className="channel-subscriberscount--m">{video.owner.subscribers.length} subscribers</p>
                                        </div>
                                    </div>
                                    <div className="ps-3">
                                        <ButtonSubscribe id={video?.owner?._id} name={video?.owner?.name} />
                                    </div>
                                </div>
                                <div className="">
                                    <LikeButton countlike={video.likeCount} />
                                </div>
                            </div>
                            <div className="mt-3 w-100 bg-light bg-opacity-25 rounded px-3 py-2">
                                <p className="fw-semibold">28 K vistas hace 2 días</p>
                                <p className="video-description">
                                    {video.description}
                                </p>
                            </div>
                            <Comments videoID={video._id} />
                        </div>
                        <div className="col-12 col-lg-4 d-flex flex-column gap-3 ps-lg-3 ps-xxl-5">
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
