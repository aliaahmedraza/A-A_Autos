import Footer from "../../components/Footer/Footer.jsx";
import Headers from "../../components/Header/Header.jsx";
import {SidebarWithBurgerMenu} from "../../components/Menu/Menu.jsx";

const Dashboard = () => {
  return (
    <div>
      <Headers />
      {/* <MenuOption /> */}
       <SidebarWithBurgerMenu/>
      <Footer/>
    </div>
  );
};

export default Dashboard;
