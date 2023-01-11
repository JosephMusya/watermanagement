import Navbar from "./components/MainNav";
import MainPage from "./pages/MainPage";
import TankSetup from "./pages/Setup";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar/>    
      <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='/tank-setup' element={<TankSetup/>}/>
      </Routes>      
    </div>
  );
}

export default App;
