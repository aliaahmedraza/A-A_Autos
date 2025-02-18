import SearchBar from "../SearchBar/SearchBar";

const Headers = () => {
  return (
    <div>
      <div className="flex justify-between items-center bg-[#c5252c] h-28 px-24">
        <div className="flex justify-center items-center">
          <span>
            <img
              src="/Assets/Images/C10.png"
              alt="logo"
              className="w-20 h-20"
            />
          </span>
          <h1 className="text-white font-bold text-3xl ml-4">A&A Autos</h1>
        </div>
        <div className="flex w-[80%] pt-4">
          <div className="w-[90%]">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
