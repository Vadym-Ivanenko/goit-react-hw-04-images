import { toast } from 'react-toastify';
import * as Api from '../api/Api';
import { SearchBar } from 'components/search-bar/SearchBar';
import { ImageGallery } from '../image-gallery/ImageGallery';
import { Loader } from '../loader/Loader';
import { LoadMore } from '../button/Button';
import Modal from '../modal/Modal';
import { GlobalStyle } from '../globalStyle';
import { Wrapper } from './App.styled';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, stePage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) {
        return;
      }
      setLoading({ loading: true });
      try {
        const { hits, totalHits } = await Api.fetchGalleryImages(query, page);

        setImages(
          images => [...images, ...hits],
          setIsLoadMore(page < Math.ceil(totalHits / 12))
        );
      } catch (error) {
        setError({ error: true });
        toast.error('Sorry, have some problem');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeImage = largeImage => {
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const handleSubmit = value => {
    setQuery(value);
    setImages([]);
    stePage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    stePage(page + 1);
  };

  return (
    <Wrapper>
      <SearchBar onSubmit={handleSubmit} />

      {showModal && <Modal image={largeImage} onClose={toggleModal} />}

      <ImageGallery images={images} onGetLargeImage={getLargeImage} />

      {error && toast.error(' Sorry. Something went wrong! Please try again!')}

      {loading && <Loader />}

      {isLoadMore && <LoadMore onClick={handleLoadMore} />}

      <GlobalStyle />
    </Wrapper>
  );
};
