import { Component } from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import s from './ImageGallery.module.css';
import sItem from '../ImageGalleryItem/ImageGalleryItem.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import pixabayAPI from '../../services/PixabayAPI';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    totalImages: 0,
    showLoader: false,
  };

  async componentDidMount() {
    this.setState({ showLoader: true });

    await this.fetchImages(this.props.query, this.props.page);
    this.setState({ showLoader: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevPage !== nextPage) {
      if (prevQuery !== nextQuery) {
        this.setState({
          images: [],
          totalImages: 0,
        });
      }

      this.setState({ showLoader: true });

      await this.fetchImages(nextQuery, nextPage);
      this.setState({ showLoader: false });
    }
  }

  async fetchImages(query, page) {
    this.setState({ showLoader: true });
    const newImages = await pixabayAPI.fetchPixabayImages(query, page);

    this.setState(({ images }) => ({
      images: [...images, ...newImages.hits],
      totalImages: newImages.total,
    }));

    this.imagesIsAvailable();
    this.scrollToEndPage();

    this.props.setLastPage(Math.ceil(this.state.totalImages / 12));
    this.setState({ showLoader: false });
  }

  imagesIsAvailable() {
    if (!this.state.images.length) {
      toast.error('За запитом нічого не знайдено. Спробуйте інший запит!');
      this.props.resetState();
    }
  }

  scrollToEndPage = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleClickImage = event => {
    this.props.openImage(
      event.target
        .closest(`.${sItem.ImageGalleryItem}`)
        .querySelector('img')
        .getAttribute('srclarge'),
    );
  };

  render() {
    return (
      this.state.images && (
        <div>
          <ul onClick={this.handleClickImage} className={s.ImageGallery}>
            <ImageGalleryItem
              imagesData={this.state.images}
              openImage={this.props.openImage}
            />
          </ul>

          {this.state.showLoader && (
            <div className={s.Loader}>
              <Loader type="Circles" color="#3f51b5" height={40} width={40} />
            </div>
          )}
        </div>
      )
    );
  }
}

export default ImageGallery;
