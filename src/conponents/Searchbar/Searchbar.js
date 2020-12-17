import { Component } from 'react';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = { query: '' };

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.error('Enter image query');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
