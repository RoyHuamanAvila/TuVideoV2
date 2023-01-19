import { FC } from "react"
import { Link } from "react-router-dom"
import { Video } from "../interfaces"

const VideoItem: FC<{ orientation: 'vertical' | 'horizontal', data: Video }> = ({ orientation, data }) => {
    return (
        <div className="videoitem">
            <div className="col">
                <div className={`videoitem--${orientation}`}>
                    <div className={`img-container img-container--${orientation}`}>
                        <img className="w-100 h-auto" src={data?.thumbnail} alt="" />
                    </div>
                    <div className="d-flex videoitem-data">
                        {
                            orientation === 'vertical' && <div>
                                <Link to={`channel/${data.owner?._id}`} title="channel">
                                    <div className="channel-img overflow-hidden d-flex align-items-center justify-content-center">
                                        <img className="img-fluid" src={data.owner?.logo as string} alt="" />
                                    </div>
                                </Link>
                            </div>
                        }
                        <div>
                            <p className="title">{data?.title}</p>
                            <Link to={`/channel/${data.owner?._id}`} className="info pt-1" title="channel">{data?.owner?.name}</Link>
                            <p className="videoitem-stats">
                                <span>11 K vistas</span><span className="px-1">•</span><span>hace 8 días</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoItem
