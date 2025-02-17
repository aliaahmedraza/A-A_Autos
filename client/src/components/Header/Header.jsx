// import LoginModal from "../Modals/LoginModal/LoginModal";
import MenuOption from "../Menu/Menu";
// import SignUpModal from "../Modals/SignUpModal/SignUpModal";
import SearchBar from "../SearchBar/SearchBar";


const Headers = () => {
  return (
    <div>
      <div className="flex justify-between items-center bg-[#001529] h-28">
        <div>
          <h1 className="text-white font-bold w-48 ml-24">A&A Autos</h1>
        </div>

        <div className="flex w-[100%]">
          <div className="w-[100%]">
            <SearchBar />
          </div>
          <span className="mr-10"></span>
          <span className="mr-24"></span>
        </div>
      </div>
      <MenuOption />
    </div>
  );
};

export default Headers;
