import React, { FC } from 'react'
import { Channel } from '../interfaces'
import ButtonSubscribe from './ButtonSubscribe'

const SuscribeItem: FC<Channel> = ({ logo, name, _id, subscribers }) => {
  return (
    <div className='d-flex align-items-center justify-content-between mx-5'>
      <div className="channel-logo--lg rounded-circle overflow-hidden">
        <img className='channel-logo-img' src={logo as string} alt="logo channel" />
      </div>
      <div>
        <p className='fs-5 fw-semibold m-0'>{name}</p>
        <p>{subscribers?.length || 0} subscribers</p>
      </div>
      <ButtonSubscribe id={_id} name={name} />
    </div>
  )
}

export default SuscribeItem
