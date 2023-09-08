import { useSelector } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react'
import { RootState } from "../../app/store";
import SuscribeItem from "../../components/SuscribeItem";
import './Subscribes.scss'

const Subscribes = () => {
    const { isAuthenticated } = useAuth0();
    const channel = useSelector((state: RootState) => state.yourChannel);
    return (
        <div className="Subscribes">
            {
                isAuthenticated ? (
                    channel?.subscribes?.map((channel, index) => <SuscribeItem key={index} {...channel} />)
                ) :
                    <>
                        <i className="bi bi-collection-play Subscribes__icon"></i>
                        <p className="fs-4 fw-semibold">No te pierdas los nuevos videos</p>
                        <p>Accede para ver las actualizaciones de tus canales favoritos</p>
                    </>
            }
        </div>
    )
}

export default Subscribes
