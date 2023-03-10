import React, { useEffect, useMemo, useState } from 'react'
import { AsyncButtonInterface, CreateVideo } from '../interfaces';
import { useVideoThumbnails } from '../hooks/useVideoThumbnails';
import AsyncButton from './AsyncButton';
import { uploadVideo } from "../features/user/userSlice";

const UploadVideoModal = () => {
    const initialState: CreateVideo = {
        title: '',
        description: '',
        video: '',
        thumbnail: ''
    }

    const [video, setVideo] = useState<CreateVideo>(initialState);
    const convertVideoPath = (url: string | File): string => {
        if (url instanceof File) {
            return URL.createObjectURL(url);
        }
        return url;
    };

    const { videoRef, canvasRef, thumbnails } = useVideoThumbnails(convertVideoPath(video?.video))


    const addVideo = (e: React.FormEvent<HTMLInputElement>) => {
        const fileVideo = e.currentTarget.files;
        if (fileVideo) {
            setVideo({ ...video, title: fileVideo[0].name, video: fileVideo[0] });
        }
    }

    const addThumbnail = (e: React.FormEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setVideo({ ...video, thumbnail: files[0] })
    }

    const removeVideo = () => {
        setVideo(initialState);
    }

    const handleDataVideo = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVideo({ ...video, [e.currentTarget.name]: e.currentTarget.value });
    }

    /*     const uploadVideo = async () => {
            const formData = new FormData();
            for (const [key, value] of Object.entries(video)) {
                formData.append(key, value);
            }
            console.log(formData.values())
            try {
                setVideo(initialState);
                const token = localStorage.getItem('token');
                console.log(token)
                const response = await axios.request({
                    url: `${import.meta.env.VITE_DOMAIN_BD}/video`,
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData,
                })
                console.log(response.data)
                toast('Video uploaded', {
                    type: 'success'
                })
            } catch (error) {
                console.log(error);
                toast('An error ocurred', {
                    type: 'error'
                })
            }
        } */
    const token = localStorage.getItem('token') || '';
    const asyncButtonConfig: AsyncButtonInterface = {
        actionName: 'Upload Video',
        succesMessage: 'Video uploaded succesful',
        errorMessage: 'Error at upload video',
        styles: 'btn btn-confirm text-white',
        thunkAction: uploadVideo({ data: video, token }),
    }

    const memoVideoPreview = useMemo(() => <video className='col-12' ref={videoRef} src={convertVideoPath(video.video)} controls />, [video.video])

    useEffect(() => {
        console.log('render')
    })
    return (
        <div className="modal fade" id="uploadVideoModal" tabIndex={-1} aria-labelledby="uploadVideoLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{video?.title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 col-xl-7">
                                {
                                    video.video ? (
                                        memoVideoPreview
                                    ) : (
                                        <div className="col-12 bg-light d-flex align-items-center" style={{ height: '200px' }}>
                                            <i className="bi bi-play-circle-fill fs-1 text-center w-100 text-white"></i>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="col-12 col-xl-5 mt-3 overflow-hidden">
                                <div className="d-flex align-items-center ms-2 mb-3">
                                    <button className='btn btn-secondary text-white position-relative'>
                                        <i className="bi bi-file-earmark-play"></i> Add Video
                                        <input className='change-image' type="file" onChange={addVideo} accept='video/mp4' />
                                    </button>
                                    <button className='btn border-0' onClick={removeVideo}>
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>
                                <form className='form-control border-0'>
                                    <fieldset disabled={video.video ? false : true}>
                                        <div className="mb-3">
                                            <label className='form-label'>Title</label>
                                            <input className='form-control' value={video.title} type="text" name='title' onChange={handleDataVideo} />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label'>Description</label>
                                            <textarea className='form-control' name="description" title='description' onChange={handleDataVideo} cols={30} rows={5}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label'>Thumbnails</label>
                                            <canvas ref={canvasRef} width={400} height={250} className='d-none'>
                                            </canvas>
                                            <div className='d-flex gap-2'>
                                                <div className="position-relative col-4 d-flex flex-column align-items-center justify-content-center border">
                                                    {
                                                        video.thumbnail ? (
                                                            <img src={convertVideoPath(video.thumbnail)} alt="Thumbnail selected" className='img-fluid' />
                                                        ) : (
                                                            <div className='d-flex align-items-center flex-column px-5'>
                                                                <i className="bi bi-card-image fs-3"></i>
                                                                <p className='text-center'>Add Thumbnail</p>
                                                                <input type="file" className='change-image' accept='image/*' onChange={addThumbnail} />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                {
                                                    thumbnails.map((thumbnail, index) => (
                                                        <img className='col-4 img-fluid' key={index} src={thumbnail} alt="" />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
                        <AsyncButton {...asyncButtonConfig} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadVideoModal;
