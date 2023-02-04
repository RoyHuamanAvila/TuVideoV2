import { FC, useState } from "react";
import { ManageComment } from "../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const BoxComment: FC<ManageComment> = ({ comment, deleteComment, updateComment }) => {
  const { content, owner, _id } = comment;
  const [newContent, setNewContent] = useState(content);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyOwner = () => {
    const user = useSelector((state: RootState) => state.user);
    if (user) {
      if (user.user_metadata?.channel === owner._id) return true;
      return false;
    }
    return false;
  }

  const handleEditComment = (e: React.FormEvent<HTMLInputElement>) => {
    setNewContent(e.currentTarget.value);
  }

  const toggleEditMode = () => {
    setNewContent(content);
    setEditMode(!editMode);
  }

  const handleUpdateCommment = async () => {
    setLoading(true);
    await updateComment(newContent, _id);
    setLoading(false);
    toggleEditMode();
  }

  const handleDeleteComment = async () => {
    deleteComment(_id);
  }

  return (
    <div className="d-flex align-flex-start gap-3">
      <div className="channel-logo--md overflow-hidden">
        <img className="channel-logo-img" src={owner.logo as string} alt="logo" />
      </div>
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <p className="comment-title">{owner.name} <span className="fw-normal text-light">hace 15 minutos</span></p>
          {
            verifyOwner() && (
              <div>
                <button className="bi bi-pencil border-0 bg-transparent" title="Edit" onClick={toggleEditMode}></button>
                <button className="bi bi-trash3 border-0 bg-transparent" title="Delete" onClick={handleDeleteComment}></button>
              </div>
            )
          }
        </div>
        {
          editMode ? (
            <>
              <div className="comment-input-control mb-2">
                <input className="comment-input" type="text" placeholder="Enter your comment" value={newContent} onChange={handleEditComment} required />
              </div>
              <div className="d-flex gap-2 align-items-end flex-row-reverse mb-3">
                <button
                  className="btn btn-confirm text-white"
                  onClick={handleUpdateCommment}
                  disabled={loading}
                >
                  {
                    loading ?
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> :
                      <p className="m-0">Save</p>
                  }
                </button>
                <button className="btn btn-cancel" onClick={toggleEditMode}>Cancel</button>
              </div>
            </>
          ) : (
            <p className="comment-text">
              {content}
            </p>
          )
        }
      </div>
    </div>
  )
}

export default BoxComment;
