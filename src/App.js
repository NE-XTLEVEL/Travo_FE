import './App.css';
import MainWeb from './pages/MainWeb';
import Plan from './pages/Plan';
// import MainMobile from './pages/MainMobile';
import { Routes, Route } from 'react-router-dom';
// import useResponsive from './useResponsive';
import GridLines from 'react-gridlines';

function App() {
  // const { isMobile } = useResponsive();
  return (
    <GridLines
      className="grid-area"
      cellWidth={20}
      strokeWidth={0.5}
      color="EFEFEF"
    >
      <Routes>
        <Route path="/plan" element={<Plan />} />
        <Route path="/" element={<MainWeb />}></Route>
      </Routes>
    </GridLines>
  );
}

export default App;
