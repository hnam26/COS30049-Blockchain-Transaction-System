import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/search.css';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Navigate to the same URL to reload the page
        navigate(`/${searchValue}`);
        // Reset the search value
        setSearchValue('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    className='searchBox'
                    placeholder='Search wallet address ...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" id='search-btn'>Search</button>
            </form>
        </>
    );
};

export default Search;
