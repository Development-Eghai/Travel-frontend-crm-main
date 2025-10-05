import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        priceRange: '',
        duration: '',
        rating: '',
        sortBy: 'relevance'
    });

    useEffect(() => {
        // Get search parameters from URL
        const searchParams = new URLSearchParams(location.search);
        const destination = searchParams.get('destination') || '';
        setSearchQuery(destination);

        // Simulate loading search results
        setTimeout(() => {
            // Placeholder search results - you'll replace this with actual API call
            const mockResults = [
                {
                    id: 1,
                    title: "Adventure Tour in " + destination,
                    description: "Experience the thrill of adventure in " + destination,
                    price: "$999",
                    duration: "7 days",
                    rating: 4.5,
                    image: "/src/assets/images/featured-card.png",
                    location: destination
                },
                {
                    id: 2,
                    title: "Cultural Experience in " + destination,
                    description: "Immerse yourself in the rich culture of " + destination,
                    price: "$799",
                    duration: "5 days",
                    rating: 4.8,
                    image: "/src/assets/images/featured-card.png",
                    location: destination
                },
                {
                    id: 3,
                    title: "Relaxation Getaway in " + destination,
                    description: "Unwind and relax in the beautiful " + destination,
                    price: "$1299",
                    duration: "10 days",
                    rating: 4.2,
                    image: "/src/assets/images/featured-card.png",
                    location: destination
                }
            ];
            setSearchResults(mockResults);
            setLoading(false);
        }, 1000);
    }, [location.search]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/travel-form`);
        }
    };

    const handleResultClick = (result) => {
        // Navigate to tour detail page
        navigate(`/tour-overview?id=${result.id}`);
    };

    if (loading) {
        return (
            <div className="search-results-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Searching for amazing tours...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="search-results-container">
                {/* Search Header */}
                <div className="search-results-header">
                    <div className="container">
                        <div className="search-results-title">
                            <h1>Search Results</h1>
                            <p>Found {searchResults.length} tours for "{searchQuery}"</p>
                        </div>

                        {/* Search Bar */}
                        <div className="search-results-search-bar">
                            <form onSubmit={handleSearch}>
                                <div className="search-input-group">
                                    <i className="fa-solid fa-search search-icon"></i>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search countries, cities"
                                        className="search-input"
                                    />
                                    <button type="submit" className="search-button">
                                        <i className="fa-solid fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container">
                    <div className="search-results-main">
                        {/* Filters Sidebar */}
                        <div className="search-filters-sidebar">
                            <div className="filter-section">
                                <h3>Filters</h3>

                                <div className="filter-group">
                                    <label>Price Range</label>
                                    <select
                                        value={filters.priceRange}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                    >
                                        <option value="">Any Price</option>
                                        <option value="0-500">Under $500</option>
                                        <option value="500-1000">$500 - $1000</option>
                                        <option value="1000-2000">$1000 - $2000</option>
                                        <option value="2000+">Over $2000</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Duration</label>
                                    <select
                                        value={filters.duration}
                                        onChange={(e) => handleFilterChange('duration', e.target.value)}
                                    >
                                        <option value="">Any Duration</option>
                                        <option value="1-3">1-3 days</option>
                                        <option value="4-7">4-7 days</option>
                                        <option value="8-14">8-14 days</option>
                                        <option value="15+">15+ days</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Rating</label>
                                    <select
                                        value={filters.rating}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                    >
                                        <option value="">Any Rating</option>
                                        <option value="4.5+">4.5+ stars</option>
                                        <option value="4.0+">4.0+ stars</option>
                                        <option value="3.5+">3.5+ stars</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results Grid */}
                        <div className="search-results-grid">
                            <div className="results-header">
                                <div className="results-count">
                                    <span>{searchResults.length} tours found</span>
                                </div>
                                <div className="results-sort">
                                    <label>Sort by:</label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    >
                                        <option value="relevance">Relevance</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Rating</option>
                                        <option value="duration">Duration</option>
                                    </select>
                                </div>
                            </div>

                            <div className="results-list">
                                {searchResults.map((result) => (
                                    <div key={result.id} className="search-result-card" onClick={() => handleResultClick(result)}>
                                        <div className="result-image">
                                            <img src={result.image} alt={result.title} />
                                            <div className="result-price">{result.price}</div>
                                        </div>
                                        <div className="result-content">
                                            <h3>{result.title}</h3>
                                            <p className="result-description">{result.description}</p>
                                            <div className="result-meta">
                                                <span className="result-location">
                                                    <i className="fa-solid fa-map-marker-alt"></i>
                                                    {result.location}
                                                </span>
                                                <span className="result-duration">
                                                    <i className="fa-solid fa-clock"></i>
                                                    {result.duration}
                                                </span>
                                                <span className="result-rating">
                                                    <i className="fa-solid fa-star"></i>
                                                    {result.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {searchResults.length === 0 && (
                                <div className="no-results">
                                    <div className="no-results-content">
                                        <i className="fa-solid fa-search"></i>
                                        <h3>No tours found</h3>
                                        <p>Try adjusting your search criteria or browse our popular destinations.</p>
                                        <button onClick={() => navigate('/')} className="browse-button">
                                            Browse Popular Tours
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SearchResults; 