import {Link} from 'react-router-dom'
import Logo from './media/logo.webp'
function Navbar(){
    return (
        <nav>
            <div className='logo'>
                <img src={Logo} alt="Waziup Logo" />
            </div>
            <div>                
                <strong>Waziup Water Management</strong>                
            </div>
            <div className="nav-elements">
                <Link to='/'>Home</Link>
                <Link to='/user-profile'>Profile</Link>
                <Link to='/alerts'>Alerts</Link>
            </div>
        </nav>
    );
    
}

export default Navbar;
