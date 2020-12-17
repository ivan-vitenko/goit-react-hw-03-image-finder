import s from './ImageGalleryItem.module.css';

function ImageGalleryItem(imagesData) {
  const images = imagesData.imagesData;

  return images.map(image => (
    <li key={image.id} className={s.ImageGalleryItem}>
      <img
        id={image.id}
        src={image.webformatURL}
        srclarge={image.largeImageURL}
        alt=""
        className={s.ImageGalleryItemImage}
      />
    </li>
  ));
}

export default ImageGalleryItem;
