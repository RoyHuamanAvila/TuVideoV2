import { FC } from "react"
import { Icon } from "../interfaces"


export const YourChannelOutline: FC<Icon> = ({ color }) => {
    return (
        <span className="pe-2">
            <svg viewBox="0 0 24 24" className="dropdown-icon">
                <g>
                    <path fill={color} className='dropdown-icon' d="M3,3v18h18V3H3z M4.99,20c0.39-2.62,2.38-5.1,7.01-5.1s6.62,2.48,7.01,5.1H4.99z M9,10c0-1.65,1.35-3,3-3s3,1.35,3,3 c0,1.65-1.35,3-3,3S9,11.65,9,10z M12.72,13.93C14.58,13.59,16,11.96,16,10c0-2.21-1.79-4-4-4c-2.21,0-4,1.79-4,4 c0,1.96,1.42,3.59,3.28,3.93c-4.42,0.25-6.84,2.8-7.28,6V4h16v15.93C19.56,16.73,17.14,14.18,12.72,13.93z"></path>
                </g>
            </svg>
        </span>
    )
}

export const Logout: FC<Icon> = ({ color }) => {
    return (
        <span className="pe-2">
            <svg viewBox="0 0 24 24" className="dropdown-icon">
                <g>
                    <path fill={color} className="dropdown-icon" d="M20,3v18H8v-1h11V4H8V3H20z M11.1,15.1l0.7,0.7l4.4-4.4l-4.4-4.4l-0.7,0.7l3.1,3.1H3v1h11.3L11.1,15.1z"></path>
                </g>
            </svg>
        </span>
    )
}
