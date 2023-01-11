import {Link} from 'react-router-dom'
function Navbar(){
    return (
        <nav>
            <div>
                <strong>Waziup Water Management</strong>
            </div>
            <div className="nav-elements">
                <Link to='/'>Home</Link>
                <Link to='/tank-setup'>Tank Setup</Link>
            </div>
        </nav>
    );
    
}

export default Navbar;
