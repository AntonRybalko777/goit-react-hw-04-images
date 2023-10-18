import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List, Li } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(image => (
        <Li key={image.id}>
          <ImageGalleryItem image={image} />
        </Li>
      ))}
    </List>
  );
};
