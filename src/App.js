import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Transports from "./pages/transports/Transports";
import Contracts from "./pages/contracts/Contracts";
import Cutters from "./pages/cutters/Cutters";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/transports' element={<Transports />} />
          <Route path='/contracts' element={<Contracts />} />
          <Route path='/cutters' element={<Cutters />} />
        </Routes>
    </BrowserRouter>
  )
}


export default App;
