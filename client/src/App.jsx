import "./App.css";
// import Headers from "./components /Header/Header.jsx";
import AllRoutes from "./routes/AllRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
// import "antd/dist/antd.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AllRoutes />
        {/* <Headers/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
