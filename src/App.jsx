import { Routes, Route } from 'react-router-dom';
import NavBar from './components/shared/NavBar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Status from './components/Status/Status';
import Ramses from './components/Ramses/Ramses'; 

function App() {
  return (
    <div className="App">
      <NavBar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ramses" element={<Ramses />} />
        <Route path="/about" element={<About />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </div>
  );
}

export default App;
