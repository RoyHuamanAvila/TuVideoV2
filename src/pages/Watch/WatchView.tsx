import { FC } from "react"
import { Video } from "../../interfaces"
import './Watch.scss'

interface WatchViewProps {
  video: Video
}

const WatchView: FC<WatchViewProps> = ({ video }) => {
  const { url, title, owner } = video;
  return (
    <div className="Watch">
      <video className="Watch__video" src={url}></video>
      <div className="px-3 d-flex flex-column gap-2">
        <p className="m-0 fs-4 fw-semibold">{title}</p>
        <p className="m-0"><small>1.9 M vistas hace 2 meses</small></p>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2 align-items-center">
            <img className="Watch__logo-channel" src={owner.logo as string} alt="Logo Channel" />
            <p className="m-0">{owner.name}</p>
            <p><small>{owner.subscribers}</small></p>
          </div>
          <button className="btn rounded-pill fw-semibold btn-primary">Suscribirse</button>
        </div>
        <div className="d-flex me-auto align-items-center gap-2 bg-grey-50 rounded-5 px-3 py-2 text-secondary">
          <img src="/icons/icon-thumbs-up.svg" alt="thumbs up" />
          <p className="m-0">150 k</p>
          <p className="m-auto">|</p>
          <img src="/icons/icon-thumbs-down.svg" alt="thumbs down" />
        </div>
        <div className="bg-grey-50 rounded-5 px-3 py-2">
          <p className="m-0 fw-semibold mb-2">
            Comentarios <span className="fw-normal ps-2"><small>6.6 K</small></span>
          </p>
          <div className="d-flex gap-2">
            <img className="Watch__logo-channel" src={owner.logo as string} alt="Logo Channel" />
            <p className="Watch__comment"><small>
              Ningún otro videojuego ni medio visual me a hecho sentir lo que Final Fantasy VII, jamás había presenciado una historia tan grande, emocionante y hermosa, estoy seguro que este videojuego estará a la altura
            </small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchView
