const VideoCardPlaceholder = () => {
  return (
    <div className='video-card placeholder-glow'>
      <div className='video-card__thumbnail mb-3'></div>
      <div className='d-flex align-items-start gap-3'>
        <div className='channel-logo'></div>
        <div className="flex-grow-1">
          <p aria-hidden='true' className="m-0">
            <span className='placeholder col-10 bg-light'></span>
          </p>
          <p aria-hidden='true' className="fs-6">
            <span className='placeholder col-6 bg-light'></span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCardPlaceholder;
