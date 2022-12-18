import VideoItem from "../components/VideoItem"

const Home = () => {
    return (
        <div className="row px-3 row-cols-4">
            <VideoItem orientation="vertical" />
            <VideoItem orientation="vertical" />
            <VideoItem orientation="vertical" />
            <VideoItem orientation="vertical" />
            <VideoItem orientation="vertical" />
            <VideoItem orientation="vertical" />
        </div>
    )
}


export default Home
