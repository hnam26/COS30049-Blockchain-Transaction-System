import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../../styles/search.css';

// Search component
const Search = () => {
    // State for search input value
    const [searchValue, setSearchValue] = useState('');

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to the specified wallet address route
        navigate(`/addresses/${searchValue}`);
    };

    // Handle input value change
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    // Render Search component
    return (
        <form onSubmit={handleSubmit} className='formSearch'>
            <label htmlFor="search">Search</label>
            {/* Input for entering wallet address */}
            <input
                className='search-input'
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder="Search wallet address"
            />
            {/* Button for submitting the search */}
            <button type="submit" id='search-btn'>Search</button>
        </form>
    );
};

// Export Search component
export default Search;
