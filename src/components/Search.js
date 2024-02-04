import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/search.css';
const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${searchValue}`);
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search</label>
            <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder="Search wallet address"
            />
            <button type="submit" id='search-btn'>Search</button>
        </form>
    );
};

export default Search;
