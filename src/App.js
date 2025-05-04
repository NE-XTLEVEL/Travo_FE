import './App.css';
import MainWeb from './pages/MainWeb';
import Plan from './pages/Plan';
import PlanMobile from './mobile-pages/PlanMobile';
import MainMobile from './mobile-pages/MainMobile';
import { Routes, Route } from 'react-router-dom';
import useResponsive from './useResponsive';
import GridLines from 'react-gridlines';
import Main from './pages/Main';
import Login from './pages/Login/Login';
import './index.css';

function App() {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <GridLines
        className="grid-area"
        cellWidth={20}
        strokeWidth={0.5}
        color="EFEFEF"
      >
        <Routes>
          <Route path="/plan" element={<PlanMobile />} />
          <Route path="/main" element={<MainMobile />} />
          <Route path="/" element={<MainMobile />} />
        </Routes>
      </GridLines>
    );
  }

  return (
    <GridLines
      className="grid-area"
      cellWidth={20}
      strokeWidth={0.5}
      color="EFEFEF"
    >
      <Routes>
        <Route path="/plan" element={<Plan />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainWeb />}></Route>
      </Routes>
    </GridLines>
  );
}

export default App;
