import 'rsuite/styles/index.less';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Transports from "./pages/transports/Transports";
import Cuts from "./pages/cuts/Cuts";
import Cutters from "./pages/cutters/Cutters";
import Home from "./pages/home/Home";
import { CustomProvider, Footer } from 'rsuite';
import CutDescription from './pages/cut-description/CutDescription';
import TransportDescription from './pages/transport-description/TransportDescription';
import CutterDescription from './pages/cutter-description/CutterDescription';
import CutterDashboard from './pages/cutter-dashboard/CutterDashboard';
import Car from './pages/car/Car';

const App = () => {
    return (
        <CustomProvider theme="dark">
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/transports' element={<Transports />} />
                    <Route path='/cuts' element={<Cuts />} />
                    <Route path='/cutters' element={<Cutters />} />

                    <Route path='/transport/:hash' element={<TransportDescription />} />
                    <Route path='/cut/:hash' element={<CutDescription />} />
                    <Route path='/cutter/:cif' element={<CutterDescription />} />

                    <Route path='/car/:car' element={<Car />} />

                    <Route path='/dashboard/:address' element={<CutterDashboard />} />
                </Routes>

                <Footer style={{ 'backgroundColor': '#1a1d24' }}>
                    <p style={{ 'textAlign': 'center', 'paddingTop': '10px' }}>© Erik Halmai 2022</p>
                    <p style={{ 'textAlign': 'center', 'paddingBottom': '10px', 'margin': '0px' }}>Build v1.0</p>
                </Footer>
            </BrowserRouter>
        </CustomProvider>
    )
}


export default App;
