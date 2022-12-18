import SignInButton from "../components/SignInButton"

const Subscribes = () => {
    return (
        <div className="d-flex position-absolute justify-content-center align-items-center w-100 h-100 flex-column">
            <img className="pb-5" src="icons/SubsOutline.svg" width='120px' height='120px' alt="" />
            <p className="fs-4">Don’t miss new videos</p>
            <p>Sign in to see updates from your favorite YouTube channels</p>
            <SignInButton />
        </div>
    )
}

export default Subscribes
