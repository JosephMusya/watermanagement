import {LoginContext} from '../providers/LoginProvider';
import {useState,useContext,useEffect} from 'react';
import Login from './Login';
import Tank from './Tank';
import Loading from '../components/Loading';

function MainPage(){
    const [token, ] = useContext(LoginContext); 
    const [loading, setLoading] = useState(true);
    const [loadedData, setLoadedData]    = useState([])

    useEffect(()=>{
        async function getDevices(){
        const owner  = window.localStorage.getItem('username')
        const res = await fetch(
            'https://api.waziup.io/api/v2/devices?q=owner=='+owner,           
        );
        const data = await res.json();
        setLoading(false)
        setLoadedData(data)
        data.splice(0,1);
        
        return data        
    }

    getDevices()

    },[])        
    
    return (
        token?(
            loading?<Loading/>:
                loadedData ?
                <Tank token = {token}devices={loadedData}/>:
                <div>You do not have devices yet</div>
        ):<Login/>
      
    );
}

export default MainPage;
