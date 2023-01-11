import {Link} from 'react-router-dom'
import Logo from './media/logo.webp'
import {useNavigate} from 'react-router-dom';

function Navbar(){
    const navigate = useNavigate();
    function logoutHandler(){
        window.localStorage.removeItem('token')
        console.log('Logged out..')
        navigate('/')
    }
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
                <Link onClick={logoutHandler}>Logout</Link>
            </div>
        </nav>
    );
    
}

export default Navbar;
