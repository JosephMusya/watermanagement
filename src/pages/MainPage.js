import {LoginContext} from '../providers/LoginProvider';
import {useState,useContext,useEffect} from 'react';
import Login from './Login';
import Tank from './Tank';

function MainPage(){
    const [token, ] = useContext(LoginContext); 
    const [loading, setLoading] = useState(true);
    const [loadedData, setLoadedData]    = useState([])

    useEffect(()=>{
        async function getDevices(token){
        const res = await fetch(
            'https://api.waziup.io/api/v2/devices?q=owner==muciajoe@gmail.com',           
        );
        const data = await res.json();
        setLoading(false)
        setLoadedData(data)
        data.splice(0,1);
        
        return data        
    }

    getDevices(token)

    },[])        
    
    return (
        token?(
            loading?<div>Loading...</div>:<Tank devices={loadedData}/>
        ):<Login/>
      
    );
}

export default MainPage;
