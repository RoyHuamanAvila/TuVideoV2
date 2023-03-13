import { FC, useState } from 'react';
import './styles/LikeButton.scss';
import { Dislike, Like } from '../../SVG';
import { useToggle } from '../../hooks';
import { LikeFill } from '../../SVG/LikeFill';
import { DislikeFill } from '../../SVG/DislikeFill';
export interface LikeButtonProps {
	countlike: number;
}

const LikeButton: FC<LikeButtonProps> = ({ countlike }) => {
	const [countLike, setCountLike] = useState<number>(0)
	const { active: liked, handleActive: setLiked } = useToggle();
	const { active: disliked, handleActive: setDisliked } = useToggle();

	const handleLike = () => {
		if (liked) {
			//axios dislike
			setCountLike(countLike - 1);
			setLiked(false);
			return;
		}
		setCountLike(countLike + 1);
		setDisliked(false);
		//axios like
		setLiked(true);
	}

	const handleDislike = () => {
		if (disliked) {
			//axios dislike
			setDisliked(false);
			return;
		}
		if (liked) setCountLike(countLike - 1)
		setLiked(false);
		//axios like
		setDisliked(true);
	}

	return (
		<div className='button-like-container'>
			<button title='Like' className='like' onClick={handleLike}>
				<div className='button-like-containerSvg'>
					{
						liked ? <LikeFill /> : <Like />
					}
				</div>
				{countLike}
			</button>
			<button title='Dislike' className='dislike' onClick={handleDislike}>
				<div className='button-like-containerSvg'>
					{
						disliked ? <DislikeFill /> : <Dislike />
					}
				</div>
			</button>
		</div>
	);
};

export default LikeButton;
