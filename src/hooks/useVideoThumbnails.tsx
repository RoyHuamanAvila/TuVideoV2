import { useState, useEffect, useRef } from 'react';

export function useVideoThumbnails(videoUrl: string): { thumbnails: string[], videoRef: React.MutableRefObject<HTMLVideoElement | null>, canvasRef: React.MutableRefObject<HTMLCanvasElement | null> } {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [thumbnails, setThumbnails] = useState<string[]>([]);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (video && ctx) {
            video.onloadedmetadata = () => {
                //Get video duration
                const duration = video.duration;

                if (canvas) {
                    //Generate thumbnail at start
                    video.currentTime = 0;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    setThumbnails((prevThumbnails) => [...prevThumbnails, canvas.toDataURL('image/jpeg')]);

                    // Generate thumbnail at middle
                    video.currentTime = duration / 2;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    setThumbnails((prevThumbnails) => [...prevThumbnails, canvas.toDataURL('image/jpeg')]);

                    // Generate thumbnail at end
                    video.currentTime = duration;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    setThumbnails((prevThumbnails) => [...prevThumbnails, canvas.toDataURL('image/jpeg')]);
                }
            }
        }
    }, [videoUrl])

    return { thumbnails, videoRef, canvasRef };
}
