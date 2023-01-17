import {Link} from 'react-router-dom'
import Logo from './media/logo.webp'
import {useContext} from 'react';
import {LoginContext} from '../providers/LoginProvider';
import {FaHome, FaBell,FaMale,} from 'react-icons/fa';

function Navbar(){    
    const [loginStatus, setLoginStatus] = useContext(LoginContext)

    function logoutHandler(){
        window.localStorage.removeItem('token')
        setLoginStatus(false)
    }

    function displayNavItems(){
        return(
            <div className="nav-elements"> 
                
                <Link className='icon home' to='/'><FaHome/></Link>
                <Link className='icon profile' to='/user-profile'><FaMale/></Link>
                <Link className='icon notification' to='/alerts'><FaBell/></Link>
                <Link className='logout' onClick={logoutHandler} to='/login'>Logout</Link>               
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
                    <div>Kindly Login!</div>                    
                }
            
        </nav>
    );
    
}

export default Navbar;
