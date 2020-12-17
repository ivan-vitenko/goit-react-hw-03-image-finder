import { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.props.closeImage);
  }

  render() {
    return (
      <div onClick={this.props.closeImage} className={s.Overlay}>
        <div className={s.Modal}>
          <img src={this.props.imageURL && this.props.imageURL} alt="" />
        </div>
      </div>
    );
  }
}

// function Modal(imageURL, closeImage) {
//   console.log(closeImage); // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type.

//   return (
//     <div onClick={closeImage} className={s.Overlay}>
//       <div className={s.Modal}>
//         <img src={imageURL && imageURL.imageURL} alt="" />
//       </div>
//     </div>
//   );
// }

export default Modal;
