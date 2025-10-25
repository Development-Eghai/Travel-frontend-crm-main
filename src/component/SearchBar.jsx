import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIBaseUrl } from '../common/api/api';

const SearchBar = ({ placeholder = "Where do you want to go?", className = "" }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            setIsLoading(true);
            const res = await APIBaseUrl.get("destinations/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                setDestinations(res?.data?.data || []);
            }
        } catch (error) {
            console.error("Error fetching destinations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredDestinations([]);
            setShowDropdown(false);
            return;
        }

        const filtered = destinations.filter(dest =>
            dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.slug.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredDestinations(filtered);
        setShowDropdown(true);
    }, [searchQuery, destinations]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() && filteredDestinations.length > 0) {
            const firstDest = filteredDestinations[0];
            navigate(`/destination/${firstDest.slug}/${firstDest.id}`);
            setSearchQuery('');
            setShowDropdown(false);
        }
    };

    const handleDestinationClick = (dest) => {
        navigate(`/destination/${dest.slug}/${dest.id}`);
        setSearchQuery('');
        setShowDropdown(false);
    };

    return (
        <div className={`search-bar-main ${className}`}>
            <form onSubmit={handleSearch}>
                <div className="search-input-wrapper-main">
                    <i className="fa-solid fa-search search-icon-main"></i>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery && setShowDropdown(true)}
                        className="search-input-main"
                    />
                    <button type="submit" className="search-button-main">
                            <span className="search-text"></span>
                            <i className="fa-solid fa-search search-icon-only"></i>
                    </button>
                </div>

                {showDropdown && (
                    <div className="dropdown-main">
                        {isLoading ? (
                            <div className="dropdown-item-main">
                                <i className="fa-solid fa-spinner fa-spin loading-icon-main"></i>
                                Loading destinations...
                            </div>
                        ) : filteredDestinations.length > 0 ? (
                            filteredDestinations.slice(0, 5).map((dest) => (
                                <div
                                    key={dest.id}
                                    className="dropdown-item-main"
                                    onClick={() => handleDestinationClick(dest)}
                                >
                                    <i className="fa-solid fa-location-dot location-icon-main"></i>
                                    <div className="dest-info-main">
                                        <div className="dest-title-main">{dest.title}</div>
                                        {dest.destination_type && (
                                            <span className="dest-type-main">
                                                {dest.destination_type.charAt(0).toUpperCase() + dest.destination_type.slice(1)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results-main">
                                <i className="fa-solid fa-map-location-dot no-results-icon-main"></i>
                                <p className="no-results-text-main">No destinations found</p>
                                <p className="no-results-subtext-main">Try searching for another location</p>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;