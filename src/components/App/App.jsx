import { Searchbar } from '../Searchbar/Searchbar';
import { Container, ErrorMsg } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'api';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { useState, useEffect } from 'react';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const getQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
  };

  const toloadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getQuery() {
      try {
        setLoader(true);
        const fetchedImages = await fetchImages(page, query);
        setCards(prevState => {
          if (page === 1) {
            return fetchedImages.hits;
          }
          return [...prevState, ...fetchedImages.hits];
        });
        setLoadMore(page < Math.ceil(fetchedImages.totalHits / 12));
      } catch (e) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    getQuery();
  }, [page, query]);

  // async componentDidUpdate(_, prevState) {
  //   if (page !== prevState.page && page !== 1) {
  //     try {
  //       this.setState({ loader: true });
  //       const fetchedImages = await fetchImages(page, query);
  //       this.setState(prevState => ({
  //         cards: [...prevState.cards, ...fetchedImages.hits],
  //         loadMore: this.state.page < Math.ceil(fetchedImages.totalHits / 12),
  //       }));
  //     } catch (e) {
  //       this.setState({
  //         error: true,
  //       });
  //     } finally {
  //       this.setState({ loader: false });
  //     }
  //   }
  // }

  return (
    <Container>
      <Searchbar onSubmit={getQuery} />

      {error && (
        <ErrorMsg>
          Whoops.. Something went wrong. Please reload the page.{' '}
        </ErrorMsg>
      )}
      {cards.length > 0 && <ImageGallery images={cards} />}
      {loader && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          visible={true}
        />
      )}
      {loadMore && <Button onClick={toloadMore} />}
    </Container>
  );
};
