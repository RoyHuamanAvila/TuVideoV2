import ButtonSubscribe from "../components/ButtonSubscribe"
import Comments from "../components/Comments"
import VideoItem from "../components/VideoItem"

const Watch = () => {
    return (
        <div className="watch pe-4 pt-4 gap-4">
            <div className="watch-section-1">
                <div className="bg-black watch-video"></div>
                <p className="pt-2 fs-5 fw-semibold">Kingdom Hearts 4 - Reveal Trailer</p>
                <div className="d-flex border-bottom">
                    <p className="text-light">4,004,025 views</p>
                </div>
                <div className="d-flex pt-3 gap-3 border-bottom">
                    <div className="channel-logo--m"></div>
                    <div>
                        <div className="d-flex gap-3 justify-content-between">
                            <div>
                                <p className="channel-name">Square Enix</p>
                                <p className="channel-subscriberscount--m">500,000 subscribers</p>
                            </div>
                            <div>
                                <ButtonSubscribe />
                            </div>
                        </div>
                        <p className="video-description pt-3">
                            a new mobile title called Kingdom Hearts Missing-Link.
                            Kingdom Hearts 4 was officially announced at Kingdom Hearts' 20th anniversary celebration alongside
                        </p>
                    </div>
                </div>
                <Comments />
            </div>
            <div className="watch-videolist">
                <VideoItem orientation="horizontal" />
                <VideoItem orientation="horizontal" />
                <VideoItem orientation="horizontal" />
                <VideoItem orientation="horizontal" />
                <VideoItem orientation="horizontal" />
                <VideoItem orientation="horizontal" />
            </div>
        </div>
    )
}

export default Watch
