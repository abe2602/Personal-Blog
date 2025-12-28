import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchInput = ({ onChangeCallback, value = '' }: { onChangeCallback: (value: string) => void; value?: string }) => {
  const [searchTerm, setSearchTerm] = useState(value);

  // Update local state when value prop changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleInputChange = (event: { target: { value: string; }; }) => {
    const searchText = event.target.value
    setSearchTerm(searchText);
    onChangeCallback(searchText.toString())
  };

  const handleClear = () => {
    setSearchTerm('');
    onChangeCallback('');
  };

  return (
    <div className="search-input-container">
      <input 
      type="search" 
      className="search-input"
      onChange={handleInputChange}
      value={searchTerm}
      />
      <FaSearch className="search-input-icon"/>
      {searchTerm && (
        <FaTimes className="search-clear-icon" onClick={handleClear} />
      )}
    </div>
  );
}

export default SearchInput;