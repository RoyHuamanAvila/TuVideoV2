import './VideoCard.scss'
import { FC } from "react"
import { Link } from "react-router-dom"
import { Video } from "../../interfaces"

interface VideoCard {
    data: Video;
    orientation?: 'horizontal' | 'vertical';
}

const VideoCard: FC<VideoCard> = ({ data, orientation = 'vertical' }) => {
    const { title, thumbnail, owner, _id } = data;

    return (
        <div className={`video-card video-card--${orientation}`} >
            <Link to={`/watch/${_id}`}>
                <img className='video-card__thumbnail' src={thumbnail} alt="Thumbnail video" />
            </Link>
            <div className='video-card__details'>
                <Link to={`/channel/${owner._id}`}>
                    <img className='channel-logo' src={owner.logo as string} alt="Logo channel" />
                </Link>
                <div>
                    <p className='fw-semibold m-0'>{title}</p>
                    <p className='text-grey-600 m-0'>{owner.name}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
