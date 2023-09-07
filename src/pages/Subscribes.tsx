import { useSelector } from "react-redux";
//import SignInButton from "../components/SignInButton"
import { useAuth0 } from '@auth0/auth0-react'
import { RootState } from "../app/store";
import SuscribeItem from "../components/SuscribeItem";

const Subscribes = () => {
    const { isAuthenticated } = useAuth0();
    const channel = useSelector((state: RootState) => state.yourChannel);
    return (
        <div className="subscribe px-5 py-4">
            {
                isAuthenticated ? (
                    channel?.subscribes?.map((channel, index) => <SuscribeItem key={index} {...channel} />)
                ) : <div className="d-flex position-absolute justify-content-center align-items-center w-100 h-100 flex-column">
                    <img className="pb-5" src="icons/SubsOutline.svg" width='120px' height='120px' alt="" />
                    <p className="fs-4">Don’t miss new videos</p>
                    <p>Sign in to see updates from your favorite YouTube channels</p>
                    {/* <SignInButton /> */}
                </div>
            }
        </div>
    )
}

export default Subscribes
