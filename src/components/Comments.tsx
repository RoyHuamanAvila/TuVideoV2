import { useState } from "react"

const Comments = () => {
    return (
        <div className="pt-4 pb-5">
            <p>520 comments</p>
            <BoxAddComment />
            <div>
                <BoxComment />
                <BoxComment />
                <BoxComment />
                <BoxComment />
                <BoxComment />
                <BoxComment />
            </div>
        </div>
    )
}

const BoxAddComment = () => {
    const [active, setActive] = useState(false);

    const handleActive = () => setActive(true);
    const handleDesactive = () => setActive(false);

    return (
        <div className="d-flex align-items-flexstart gap-3 mb-4">
            <div className="channel-logo--md"></div>
            <div className="w-100 d-flex flex-column">
                <div className="comment-input-control mb-2">
                    <input className="comment-input" type="text" placeholder="Enter your comment" required onFocus={handleActive} />
                </div>
                {
                    active && (
                        <div className="align-self-end d-flex gap-2">
                            <button className="border-0 bg-transparent text-light" onClick={handleDesactive}>CANCEL</button>
                            <button className="btn btn-secondary rounded-0 text-white">COMMENT</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const BoxComment = () => {
    return (
        <div className="d-flex align-flex-start gap-3">
            <div className="channel-logo--md"></div>
            <div>
                <p className="comment-title">Kusogaki <span className="fw-normal text-light">hace 15 minutos</span></p>
                <p className="comment-text">
                    Sora's metamorphosis is finally complete! He turned from a Disney character to a Final Fantasy character!
                </p>
            </div>
        </div>
    )
}
export default Comments
