import { FC } from 'react';
import './ChannelHeader.scss';

export type ChannelHeaderViewProps = {
	name: string;
	logo: string;
	isMyChannel?: boolean;
}

const ChannelHeaderView: FC<ChannelHeaderViewProps> = ({ name, logo, isMyChannel }) => {
	return (
		<div className='channelHeader px-4'>
			<div className="d-flex align-items-center gap-4">
				<div className="channel-logo">
					<img src={logo} alt="Channel picture" />
				</div>
				<div>
					<p className='channel-name m-0'>{name}</p>
					<p className='text-lowercase m-0'>@{name}</p>
					<p className='m-0'>0 suscriptores</p>
				</div>
			</div>
			{
				isMyChannel ? (
					<button className='btn-edit-channel'>Editar Canal</button>) : <button>Suscribirse</button>
			}
		</div>
	);
};

export default ChannelHeaderView;
