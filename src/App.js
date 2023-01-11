import Navbar from "./components/MainNav";
import MainPage from "./pages/MainPage";
import TankSetup from "./pages/Setup";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar/>    
      <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='/tank-setup' element={<TankSetup/>}/>
        <Route path='/alerts' element={<Alerts/>}/>
        <Route path='/user-profile' element={<Profile/>}/>
      </Routes>      
    </div>
  );
}

export default App;
