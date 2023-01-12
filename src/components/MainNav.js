import {Link} from 'react-router-dom'
import Logo from './media/logo.webp'
import {useContext} from 'react';
import {LoginContext} from '../providers/LoginProvider';

function Navbar(){    
    const [loginStatus, setLoginStatus] = useContext(LoginContext)

    function logoutHandler(){
        window.localStorage.removeItem('token')
        setLoginStatus(false)
    }

    function displayNavItems(){
        return(
            <div className="nav-elements"> 
                <Link to='/'>Home</Link>
                <Link to='/user-profile'>Profile</Link>
                <Link to='/alerts'>Alerts</Link>
                <Link onClick={logoutHandler}>Logout</Link>               
            </div>            
        )
    }
    return (
        <nav>
            <div className='logo'>
                <img src={Logo} alt="Waziup Logo" />
            </div>
            <div>
                <strong>Waziup Water Management</strong>                
            </div>            
                {
                    loginStatus ? displayNavItems():
                    <div></div>                    
                }
            
        </nav>
    );
    
}

export default Navbar;
