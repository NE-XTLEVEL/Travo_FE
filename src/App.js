import './App.css';
import MainWeb from './pages/MainWeb';
import Plan from './pages/Plan';
// import MainMobile from './pages/MainMobile';
import { Routes, Route } from 'react-router-dom';
// import useResponsive from './useResponsive';

function App() {
  // const { isMobile } = useResponsive();
  return (
    <Routes>
      <Route path="/plan" element={<Plan />} />
      <Route path="/" element={<MainWeb />}></Route>
    </Routes>
  );
}

export default App;
