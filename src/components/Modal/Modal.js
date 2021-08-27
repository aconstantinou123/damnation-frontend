import Button from '../Button/Button'

import './Modal.css'

const Modal = ({ handleClose, modalAction, text }) => {
  return (
    <div className="modal">
      <section className="modal-main">
        <h2>{text}</h2>
        <div className='modal-line-container'>
          <hr className='modal-line'></hr>
        </div>
        <Button onClick={handleClose} name='Close'/>
        <Button onClick={modalAction} name='Delete Article'/>
      </section>
    </div>
  )
}

export default Modal