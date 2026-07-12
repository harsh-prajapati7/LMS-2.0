import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search customers, loans..."
      />
    </div>
  );
}

export default SearchBar;