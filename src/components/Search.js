import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import "../styles/SearchBox.css";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate(); // Use useNavigate to get the navigation function

    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent the default form submission behavior

        // Redirect to the desired URL with the search value
        navigate(`/${searchValue}`);
    };

    return (
        <>
            <form className='formSearch' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='searchBox'
                    placeholder='Search wallet address ...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </form>
        </>
    );
};

export default Search;
