import { useState } from "react";
import "../SearchBar/SearchBar.css";

const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grapes",
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col space-y-2 w-full">
      <div className="flex items-center space-x-4">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Small delay to allow clicking suggestions
            className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Suggestion List */}
          {isFocused && searchTerm && (
            <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-40 overflow-auto">
              {filteredItems.length ? (
                filteredItems.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 text-gray-900 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>
        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-24">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
// import React from 'react'

// const SearchBar = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default SearchBar
