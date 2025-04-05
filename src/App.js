import './App.css';
import MainWeb from './pages/MainWeb';
import Recommendation from './component/Recommendation';
// import MainMobile from './pages/MainMobile';
import { Routes, Route } from 'react-router-dom';
// import useResponsive from './useResponsive';

function App() {
  // const { isMobile } = useResponsive();
  return (
    <Routes>
      <Route path="/recommendation" element={<Recommendation />} />
      <Route path="/" element={<MainWeb />}></Route>

    </Routes>
  );
}

export default App;
