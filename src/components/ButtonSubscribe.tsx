import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../app/store";
import { subscribe, unSubscribe } from "../features/channel/channelSlice";
import { FC, useState } from "react";

const ButtonSubscribe: FC<{ id: string, name: string }> = ({ id, name }) => {
    const [loading, setLoading] = useState(false);
    const channel = useSelector((state: RootState) => state.yourChannel);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem('token');
    const { loginWithRedirect } = useAuth0();

    const handleSubscribe = async () => {
        if (token) {
            setLoading(true);
            dispatch(subscribe({ subscribeID: id, token })).then(() => {
                setLoading(false);
            }).catch((error) => {
                setLoading(false)
                console.log(error);
            });
        } else {
            loginWithRedirect();
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
                            className="btn btn-white rounded-pill border-light"
                            onClick={handleUnSuscribe}
                        >
                            Subscribed
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary rounded-pill"
                            onClick={handleSubscribe}
                            disabled={loading}
                        >
                            {
                                loading ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <>Subscribe</>
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
