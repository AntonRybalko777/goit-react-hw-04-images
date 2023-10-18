import { Header, Form, Button, Input } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Form
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit(evt.target.elements.search.value);
          evt.target.reset();
        }}
      >
        <Button type="submit">
          <span>
            <BsSearch />
          </span>
        </Button>

        <Input
          type="text"
          placeholder="Search images and photos"
          name="search"
        />
      </Form>
    </Header>
  );
};
