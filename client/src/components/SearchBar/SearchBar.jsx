import ReactSearchBox from "react-search-box";
import "../SearchBar/SearchBar.css";
const SearchBar = () => {
  return (
    <div className="flex w-[100%]">
      <ReactSearchBox
        type="search"
        onChange={(e) => e.target.value}
        placeholder="Search here..."
        className="search-box"
      />
      <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
