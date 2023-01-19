import React, { useEffect, useRef } from 'react'

const GenerateVideoThumbnails = (video: HTMLVideoElement) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = canvasRef.current?.getContext('2d');

    useEffect(() => {
        if (video) {
            video.onloadedmetadata = () => {
                video.currentTime = 0;
                ctx?.drawImage(video, 0, 0, 50, 50);
            }
        }
    }, [video])

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
            <div className="d-none">

            </div>
        </div>
    )
}

export default GenerateVideoThumbnails
