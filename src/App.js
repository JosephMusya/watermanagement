import Navbar from "./components/MainNav";
import MainPage from "./pages/MainPage";
import TankSetup from "./pages/Setup";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import {Route, Routes} from 'react-router-dom';
import Login from "./pages/Login";
import {LoginProvider} from './providers/LoginProvider';

function App(){
  return (
      <LoginProvider>
        <div>
          <Navbar/>            
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' exact element={<MainPage/>}/>   
            <Route path='/tank-setup' element={<TankSetup/>}/>
            <Route path='/alerts' element={<Alerts/>}/>
            <Route path='/user-profile' element={<Profile/>}/>
          </Routes> 
        </div>
      </LoginProvider>                                                                        
  );
}

export default App;
