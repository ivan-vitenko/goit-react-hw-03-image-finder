import { Component } from 'react';
import s from './Button.module.css';

class Button extends Component {
  state = {};

  render() {
    return (
      <button
        autoFocus
        onClick={this.props.onClick}
        type="button"
        className={s.Button}
      >
        Load more
      </button>
    );
  }
}

export default Button;
