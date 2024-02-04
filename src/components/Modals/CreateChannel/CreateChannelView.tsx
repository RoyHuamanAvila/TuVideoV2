import { User } from "@auth0/auth0-react"
import { FC, RefObject } from "react"
import './CreateChannel.scss'

interface CreateChannelViewProps {
  user: User
  inputFileRef: RefObject<HTMLInputElement>
  handleInputFile: () => void
  pathImage: string
  channelName: string
  handleChannelName: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const CreateChannelView: FC<CreateChannelViewProps> = ({ inputFileRef, handleInputFile, pathImage, channelName, handleChannelName, handleSubmit }) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p className="text-center text-secondary fs-3">Crear Canal</p>
              <div className="modal-input-file">
                {
                  pathImage ?
                    <img src={pathImage} alt="New Image" /> :
                    <>
                      <i className="bi bi-person-fill"></i>
                      <i className="bi bi-pencil-fill pencil-icon"></i>
                    </>
                }
                <input type="file" name="userProfile" id="userProfile" ref={inputFileRef} onChange={handleInputFile} required />
              </div>
              <input
                className="modal-input-text"
                type="text"
                placeholder="Escribe un nombre"
                name="channelName"
                value={channelName}
                onChange={handleChannelName}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateChannelView
