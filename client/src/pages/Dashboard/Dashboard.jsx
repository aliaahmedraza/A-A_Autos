import CreateSpareParts from "../../components/CreateSpareParts/CreateSpareParts.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Headers from "../../components/Header/Header.jsx";
import { SidebarWithBurgerMenu } from "../../components/Menu/Menu.jsx";

const Dashboard = () => {
  return (
    <div className="grid gap-0">
      <div className="text-white rounded-lg col-span-1 text-center">
        <Headers />
      </div>

      <div className="grid grid-cols-[1fr_30fr] gap-0">
        <div className="bg-green-300 w-15 text-white relative">
          <SidebarWithBurgerMenu />
        </div>
        <div className="bg-green-700 text-white w-full">
          <CreateSpareParts />
        </div>
      </div>

      <div className="text-white col-span-1">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
