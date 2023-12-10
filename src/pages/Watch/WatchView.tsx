import { FC } from "react"
import { Video } from "../../interfaces"
import './Watch.scss'
import { Subscribe } from "../../components/Buttons"
import { VideoCard } from "../../components"

interface WatchViewProps {
  video: Video,
  moreVideos?: Video[]
}

const WatchView: FC<WatchViewProps> = ({ video, moreVideos }) => {
  const { url, title, owner } = video;
  return (
    <div className="Watch">
      <div className="Watch__Container">
        <section className="d-flex flex-column gap-2 flex-grow-1 ps-md-4 ps-xxl-0">
          <video className="Watch__video" src={url}></video>
          <div className="px-3 d-flex flex-column gap-2">
            <p className="Watch__title fw-semibold">{title}</p>
            <p className="Watch__view-stats">1.9 M vistas hace 2 meses</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 gap-md-3 align-items-center">
                <img className="Watch__logo-channel" src={owner.logo as string} alt="Logo Channel" />
                <div className="d-flex gap-2 flex-md-column gap-md-0 lh-sm">
                  <p className="m-0">{owner.name}</p>
                  <p className="Watch__subs-stats">15 K <span className="d-none d-md-inline">Suscriptores</span></p>
                </div>
              </div>
              <Subscribe />
            </div>
            {/*         <div className="d-flex me-auto align-items-center gap-2 bg-grey-50 rounded-5 px-3 py-2 text-secondary">
          <img src="/icons/icon-thumbs-up.svg" alt="thumbs up" />
          <p className="m-0">150 k</p>
          <p className="m-auto">|</p>
          <img src="/icons/icon-thumbs-down.svg" alt="thumbs down" />
        </div> */}
            <div className="bg-grey-50 rounded-4 px-3 py-2">
              <p className="m-0 fw-semibold mb-2">
                Comentarios <span className="fw-normal ps-2"><small>6.6 K</small></span>
              </p>
              <div className="d-flex gap-2">
                <img className="Watch__logo-channel" src={owner.logo as string} alt="Logo Channel" />
                <p className="Watch__comment">
                  Ningún otro videojuego ni medio visual me a hecho sentir lo que Final Fantasy VII, jamás había presenciado una historia tan grande, emocionante y hermosa, estoy seguro que este videojuego estará a la altura</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-3">
          <p className="fw-bold mt-2">VIDEOS RECOMENDADOS</p>
          <div className="d-flex flex-column gap-2 pe-md-5">
            {
              moreVideos?.map((video, index) => (
                <VideoCard key={index} data={video} orientation="horizontal" />
              ))
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default WatchView
