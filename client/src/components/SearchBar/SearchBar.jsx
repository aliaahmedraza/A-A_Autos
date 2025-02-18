const SearchBar = () => {
  return (
    <div>
      <input
        type="search"
        onChange={(e) => e.target.value}
        placeholder="Search here..."
        className="w-[80%] h-10 text-white border-white border-2 pl-4 mr-5 rounded-xl ml-6"
      />
      <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
