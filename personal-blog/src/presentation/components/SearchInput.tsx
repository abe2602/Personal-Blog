import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({
  onChangeCallback,
  onSearchClick,
  value = "",
}: {
  onChangeCallback: (value: string) => void;
  onSearchClick?: () => void;
  value?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleInputChange = (event: { target: { value: string } }) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);
    onChangeCallback(searchText.toString());
  };

  const isSearchEnabled = searchTerm.length >= 3;

  const handleIconClick = () => {
    if (isSearchEnabled && onSearchClick) onSearchClick();
  };

  return (
    <div className="search-input-container">
      <input
        type="search"
        className="search-input"
        onChange={handleInputChange}
        value={searchTerm}
        placeholder="Search"
      />
      <button
        type="button"
        className={`search-input-icon-btn search-input-icon-btn--right ${!isSearchEnabled ? "search-input-icon-btn--disabled" : ""}`}
        onClick={handleIconClick}
        disabled={!isSearchEnabled}
        aria-label="Search"
      >
        <FaSearch className="search-input-icon-btn__icon" aria-hidden />
      </button>
    </div>
  );
};

export default SearchInput;
