import './VideoCard.scss'
import { FC } from "react"
import { Link } from "react-router-dom"
import { Video } from "../../interfaces"

interface VideoCard {
    data: Video
}

const VideoCard: FC<VideoCard> = ({ data }) => {
    const { title, thumbnail, owner, _id } = data;

    return (
        <div className='video-card'>
            <Link to={`watch/${_id}`}>
                <img className='video-card__thumbnail mb-2' src={thumbnail} alt="Thumbnail video" />
            </Link>
            <div className='d-flex align-items-start gap-3 px-2'>
                <Link to={`channel/${owner._id}`}>
                    <img className='channel-logo' src={owner.logo as string} alt="Logo channel" />
                </Link>
                <div>
                    <p className='fw-semibold m-0'>{title}</p>
                    <p>{owner.name}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
