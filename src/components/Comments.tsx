/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react"
import { AppDispatch, RootState } from "../app/store";
import axios from "axios";
import { Comment } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { comment } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

const Comments: FC<{ videoID: string }> = ({ videoID }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const { user } = useAuth0();

    const getComments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DOMAIN_BD}/video/${videoID}/comments`);
            setComments(response.data.comments);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getComments();
    }, [videoID])

    return (
        <div className="pt-4 pb-3 border-bottom">
            <p>{comments.length} comments</p>
            {
                user && <BoxAddComment videoID={videoID} setComments={setComments} />
            }
            <div>
                {
                    comments.map((comment, index) => <BoxComment key={index} {...comment} />)
                }
            </div>
        </div>
    )
}

const BoxAddComment: FC<{ videoID: string, setComments: React.Dispatch<any> }> = ({ videoID, setComments }) => {
    const [active, setActive] = useState(false);
    const [content, setContent] = useState<string>();
    const userAuth0 = useSelector((state: RootState) => state.user);
    const handleActive = () => setActive(true);
    const handleDesactive = () => setActive(false);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem('token');

    const handleComment = async () => {
        if (content && token) {
            dispatch(comment({ content, token, videoID })).then((fullfiled) => {
                toast('Comment created', {
                    type: "success"
                })
                setComments((prevComments: any) => [...prevComments, fullfiled.payload.createdComment])
            }).catch((error) => {
                console.log(error);
                toast('Error to create comment', {
                    type: "error"
                })
            })
            setContent('');
            setActive(false);
        }
    }

    return (
        <div className="d-flex align-items-flexstart gap-3 mb-4">
            <div className="channel-logo--md overflow-hidden">
                <img className='channel-logo-img' src={userAuth0?.picture} alt="user picture" />
            </div>
            <div className="w-100 d-flex flex-column">
                <div className="comment-input-control mb-2">
                    <input className="comment-input" type="text" placeholder="Enter your comment" value={content} onChange={(e) => setContent(e.currentTarget.value)} required onFocus={handleActive} />
                </div>
                {
                    active && (
                        <div className="align-self-end d-flex gap-2">
                            <button className="border-0 bg-transparent text-light" onClick={handleDesactive}>CANCEL</button>
                            <button className="btn btn-secondary rounded-0 text-white" onClick={handleComment}>COMMENT</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const BoxComment = ({ content, owner }: Comment) => {
    return (
        <div className="d-flex align-flex-start gap-3">
            <div className="channel-logo--md overflow-hidden">
                <img className="channel-logo-img" src={owner.logo as string} alt="logo" />
            </div>
            <div className="w-100">
                <div className="d-flex justify-content-between">
                    <p className="comment-title">{owner.name} <span className="fw-normal text-light">hace 15 minutos</span></p>
                    <div>
                        <button className="bi bi-pencil border-0 bg-transparent" title="Edit"></button>
                        <button className="bi bi-trash3 border-0 bg-transparent" title="Delete"></button>
                    </div>
                </div>
                <p className="comment-text">
                    {content}
                </p>
            </div>
        </div>
    )
}
export default Comments
