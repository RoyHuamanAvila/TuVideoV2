import { FC } from 'react';
import './ChannelHeader.scss';

export type ChannelHeaderProps = {
	name: string;
	logo: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ name, logo }) => {
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
			<button className='btn-edit-channel'>Editar Canal</button>
		</div>
	);
};

export default ChannelHeader;
