import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { Container, ErrorMsg } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'api';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    cards: [],
    loader: false,
    error: false,
    loadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (query !== prevState.query) {
      try {
        this.setState({ loader: true });
        const fetchedImages = await fetchImages(page, query);
        this.setState({
          cards: fetchedImages.hits,
          loadMore: this.state.page < Math.ceil(fetchedImages.totalHits / 12),
        });
      } catch (e) {
        this.setState({
          error: true,
        });
      } finally {
        this.setState({ loader: false });
      }
    }

    if (page !== prevState.page && page !== 1) {
      try {
        this.setState({ loader: true });
        const fetchedImages = await fetchImages(page, query);
        this.setState(prevState => ({
          cards: [...prevState.cards, ...fetchedImages.hits],
          loadMore: this.state.page < Math.ceil(fetchedImages.totalHits / 12),
        }));
      } catch (e) {
        this.setState({
          error: true,
        });
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  getQuery = newQuery => {
    this.setState({
      query: newQuery,
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.getQuery} />

        {this.state.error && (
          <ErrorMsg>
            Whoops.. Something went wrong. Please reload the page.{' '}
          </ErrorMsg>
        )}
        {this.state.cards.length > 0 && (
          <ImageGallery images={this.state.cards} />
        )}
        {this.state.loader && (
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
        {this.state.loadMore && <Button onClick={this.loadMore} />}
      </Container>
    );
  }
}
