import { FC, useState } from 'react'
import { AddComment } from '../../interfaces';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

const BoxAddComment: FC<AddComment> = ({ videoID, addComment }) => {
  const [active, setActive] = useState(false);
  const [content, setContent] = useState<string>('');
  const userAuth0 = useSelector((state: RootState) => state.user);
  const handleActive = () => setActive(true);
  const handleDesactive = () => setActive(false);

  const handleAddComment = async () => {
    setActive(false);
    addComment(content, videoID);
    setContent('');
  }

  return (
    <div className="d-flex align-items-flexstart gap-3 mb-4">
      <div className="channel-logo--md overflow-hidden">
        <img className='channel-logo-img' src={userAuth0?.picture} alt="user picture" />
      </div>
      <div className="w-100 d-flex flex-column">
        <div className="comment-input-control mb-2">
          <input className="comment-input" type="text" placeholder="Enter your comment" value={content} onChange={(e) => setContent(e.currentTarget.value)} required onFocus={handleActive} />
        </div>
        {
          active && (
            <div className="align-self-end d-flex gap-2">
              <button className="border-0 bg-transparent text-light" onClick={handleDesactive}>CANCEL</button>
              <button className="btn btn-secondary rounded-0 text-white" onClick={handleAddComment}>COMMENT</button>
            </div>
          )
        }
      </div>
    </div>
  )
}
export default BoxAddComment
