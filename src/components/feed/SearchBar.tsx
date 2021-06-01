import { FaSearch } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState('');

  //for handling form submission for search bar
  const onFormSubmit = (e: FormEvent) => {
    //prevent reload
    e.preventDefault();

    const term = searchTerm.replace('#', '');

    //navigate user to search page
    history.push(`/search/${term}`);
  };

  return (
    <form className={classes.form} onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Search images using tag. Eg.#Tag or Tag"
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />

      <button>
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
