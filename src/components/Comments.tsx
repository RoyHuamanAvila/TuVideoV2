/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react"
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Comment } from "../interfaces";
import BoxAddComment from "./Comment/BoxAddComment";
import BoxComment from "./Comment/BoxComment";
import { toast } from "react-toastify";

const Comments: FC<{ videoID: string }> = ({ videoID }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const { user } = useAuth0();
    const DOMAIN_BD = import.meta.env.VITE_DOMAIN_BD;
    const token = localStorage.getItem('token');

    const handleDeleteComment = async (commentID: string) => {
        if (confirm('Delete comment?')) {
            try {
                await axios.request({
                    url: `${DOMAIN_BD}/comment/${commentID}`,
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`,
                        'content-type': 'application/json',
                    },
                })
                setComments(comments.filter(comment => comment._id !== commentID));
                toast('Delete comment successful', {
                    type: "success"
                });
            } catch (error) {
                toast('Error to delete', {
                    type: "error"
                });
                console.log(error);
            }
        }
    }

    const handleAddComment = async (content: string, videoID: string) => {
        try {
            const response = await axios.request({
                url: `${DOMAIN_BD}/comment/${videoID}`,
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                data: { content }
            })
            toast('Add comment successful', {
                type: "success"
            });
            setComments(prevComments => prevComments.concat(response.data.createdComment));
        } catch (error) {
            console.log(error);
            toast('Error to comment', {
                type: "error"
            });
        }
    }

    const handleUpdateComment = async (newContent: string, _id: string) => {
        try {
            await axios.request({
                url: `${DOMAIN_BD}/comment/${_id}`,
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                data: { content: newContent }
            })

            setComments(prevComments => prevComments.map(comment => {
                if (comment._id === _id) return { ...comment, content: newContent }
                return comment;
            }))

            toast('Update comment successful', {
                type: "success"
            });

        } catch (error) {
            toast('Error to update comment', {
                type: "error"
            });
            console.log(error);
        }
    }

    const getComments = async () => {
        try {
            setComments([]);
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
                user &&
                <BoxAddComment
                    videoID={videoID}
                    addComment={handleAddComment}
                />
            }
            <div>
                {
                    comments.map((comment, index) => (
                        <BoxComment
                            key={index}
                            comment={comment}
                            updateComment={handleUpdateComment}
                            deleteComment={handleDeleteComment}
                        />
                    ))
                }
            </div>
        </div>
    )
}


export default Comments
