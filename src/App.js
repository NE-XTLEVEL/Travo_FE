import './App.css';
import MainWeb from './pages/MainWeb';
import MainMobile from './pages/MainMobile';
import { Routes, Route } from 'react-router-dom';
import useResponsive from './useResponsive';

function App() {
  const { isMobile } = useResponsive();
  return (
    <Routes>
      <Route path="/" element={isMobile ? <MainMobile /> : <MainWeb />}></Route>
    </Routes>
  );
}

export default App;
