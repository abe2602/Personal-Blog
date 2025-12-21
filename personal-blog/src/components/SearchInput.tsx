import { SetStateAction, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import the search icon and clear icon

const SearchInput = ({ onChangeCallback }: { onChangeCallback: (value: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
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