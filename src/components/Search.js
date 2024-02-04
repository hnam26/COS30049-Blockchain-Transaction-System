import React from 'react';
import '../styles/search.css';

// Create a search bar component
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    // Handle search term change
    handleSearchTermChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    // Handle search form submission
    handleSearchSubmit = (event) => {
        event.preventDefault();
        // Perform search logic here using this.state.searchTerm
        // ...
    }

    render() {
        return (
            <form onSubmit={this.handleSearchSubmit}>
                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.handleSearchTermChange}
                    placeholder="Search wallet address"
                />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default SearchBar;
