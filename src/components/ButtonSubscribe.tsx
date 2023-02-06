import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../app/store";
import { subscribe, unSubscribe } from "../features/channel/channelSlice";
import { FC, useState } from "react";

const ButtonSubscribe: FC<{ id: string, name: string }> = ({ id, name }) => {
    const [loading, setLoading] = useState(false);
    const channel = useSelector((state: RootState) => state.yourChannel);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem('token');

    const handleSubscribe = async () => {
        if (token) {
            setLoading(true);
            dispatch(subscribe({ subscribeID: id, token })).then(() => {
                setLoading(false);
            }).catch((error) => {
                setLoading(false)
                console.log(error);
            });
        }
    }

    const handleUnSuscribe = async () => {
        if (confirm(`Unsuscribe of ${name}`)) {
            if (token) {
                setLoading(true);
                dispatch(unSubscribe({ channelID: id, token })).then(() => {
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    console.log(error);
                })
            }
        }
    }

    return (
        <>
            {
                channel ? (
                    channel.subscribes?.find(channel => channel._id === id) ? (
                        <button
                            className="btn btn-white rounded-0 border-light"
                            onClick={handleUnSuscribe}
                        >
                            SUBSCRIBED
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary rounded-0"
                            onClick={handleSubscribe}
                            disabled={loading}
                        >
                            {
                                loading ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <>SUBSCRIBE</>
                                )
                            }
                        </button>
                    )
                ) : (
                    <button className="btn btn-primary rounded-0">SUBSCRIBE</button>
                )
            }
        </>
    )
}

export default ButtonSubscribe
