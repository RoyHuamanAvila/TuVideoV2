import { User } from "@auth0/auth0-react"
import { FC } from "react"
import './CreateChannel.scss'

interface CreateChannelViewProps {
  user: User
}

const CreateChannelView: FC<CreateChannelViewProps> = () => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <p className="text-center text-secondary fs-3">Crear Canal</p>
            <div className="modal-input-file">
              <i className="bi bi-person-fill"></i>
              <i className="bi bi-pencil-fill pencil-icon"></i>
            </div>
            <input className="modal-input-text" type="text" placeholder="Escribe un nombre" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateChannelView
