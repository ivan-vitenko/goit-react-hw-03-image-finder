import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import Searchbar from './conponents/Searchbar/Searchbar';
import ImageGallery from './conponents/ImageGallery/ImageGallery';
import Button from './conponents/Button/Button';
import Modal from './conponents/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 0,
    lastPage: 1,
    visibilityLoadMore: false,
    largeImageURL: '',
  };

  resetState = () => {
    this.setState({
      query: '',
      page: 0,
      lastPage: 1,
      visibilityLoadMore: false,
      largeImageURL: '',
    });
  };

  setLastPage = lastPage => {
    this.setState({ lastPage: lastPage });

    if (this.state.page < this.state.lastPage) {
      this.setState({ visibilityLoadMore: true });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    if (this.state.page === this.state.lastPage - 1) {
      this.setState({ visibilityLoadMore: false });
      toast.info('За запитом завантажено останні картинки');
    }
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1 });
  };

  openImage = imageURL => {
    this.setState({ largeImageURL: imageURL });
  };

  closeImage = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      this.setState({ largeImageURL: '' });
      window.removeEventListener('keydown', this.closeImage);
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.query && (
          <ImageGallery
            query={this.state.query}
            page={this.state.page}
            setLastPage={this.setLastPage}
            resetState={this.resetState}
            openImage={this.openImage}
          />
        )}

        {this.state.visibilityLoadMore && (
          <Button onClick={this.handleLoadMore} />
        )}

        {this.state.largeImageURL && (
          <Modal
            imageURL={this.state.largeImageURL}
            closeImage={this.closeImage}
          />
        )}

        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}

export default App;
