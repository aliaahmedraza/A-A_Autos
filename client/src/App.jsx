import "./App.css"
import BikeServicingTimeSlots from "./components /AvailableTimeSlots/AvailableTimeSlots.jsx";
import SparePartsPriceList from "./components /SparePartsList/SparePartsList.jsx";
import AllRoutes from "./routes/AllRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AllRoutes />
        <SparePartsPriceList />
        <BikeServicingTimeSlots />
      </BrowserRouter>
    </div>
  );
}

export default App;
