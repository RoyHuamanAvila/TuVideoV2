import { FC } from "react"
import { Link } from "react-router-dom"
import { Video } from "../interfaces"

const VideoItem: FC<{ orientation: 'vertical' | 'horizontal', data?: Video }> = ({ orientation, data }) => {

    return (
        <>
            {
                data ? (
                    <div className="videoitem">
                        <div className="col">
                            <div className={`videoitem--${orientation}`}>
                                <div className={`img-container img-container--${orientation}`}>
                                    <img src={data?.thumbnail} alt="" loading="lazy" />
                                </div>
                                <div className="d-flex videoitem-data">
                                    {
                                        orientation === 'vertical' && <div>
                                            <Link to={`channel/${data.owner?._id}`} title={data.owner.name}>
                                                <div className="channel-img overflow-hidden d-flex align-items-center justify-content-center">
                                                    <img className="img-fluid" src={data.owner?.logo as string} alt="" />
                                                </div>
                                            </Link>
                                        </div>
                                    }
                                    <div>
                                        <p className="title">{data?.title}</p>
                                        <Link to={`/channel/${data.owner?._id}`} className="info pt-1" title={data.owner.name}>{data?.owner?.name}</Link>
                                        <p className="videoitem-stats">
                                            <span>11 K vistas</span><span className="px-1">•</span><span>hace 8 días</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to={`/watch/${data._id}`} className="videoitem-interaction"></Link>
                    </div>
                ) : (
                    <div className="videoitem">
                        <div className="col">
                            <div className={`videoitem--${orientation}`}>
                                <div className={`img-container bg-light bg-opacity-25 img-container--${orientation}`}>
                                </div>
                                <div className="d-flex videoitem-data">
                                    {
                                        orientation === 'vertical' && <div>
                                            <div>
                                                <div className="channel-img placeholder overflow-hidden d-flex align-items-center justify-content-center">
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="placeholder-glow w-100">
                                        <p className="title placeholder col-10"></p>
                                        <p className="info pt-1 placeholder col-6" title="channel"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default VideoItem
