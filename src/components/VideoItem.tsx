import { FC } from "react"
import { Link } from "react-router-dom"

const VideoItem: FC<{ orientation: 'vertical' | 'horizontal' }> = ({ orientation }) => {
    return (
        <Link className="videoitem" to='/watch'>
            <div className="col">
                <div className={`videoitem--${orientation}`}>
                    <div className={`img-container img-container--${orientation}`}>
                        <img className="w-100 h-auto" src="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg" alt="" />
                    </div>
                    <div className="d-flex videoitem-data">
                        {
                            orientation === 'vertical' && <div>
                                <Link to='/channel' title="channel">
                                    <div className="bg-primary channel-img" />
                                </Link>
                            </div>
                        }
                        <div>
                            <p className="title">For bigger blazes</p>
                            <Link to='/channel' className="info pt-1" title="channel">Game Of Thrones</Link>
                            <p className="videoitem-stats">
                                <span>11 K vistas</span><span className="px-1">•</span><span>hace 8 días</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoItem
