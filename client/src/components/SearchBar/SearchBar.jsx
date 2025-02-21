import ReactSearchBox from "react-search-box";
import "../SearchBar/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-grow">
        <ReactSearchBox placeholder="Search here..." className="w-full" />
      </div>
      <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-24">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
