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
        console.log('---------------------')
        const res = await fetch(
            'https://api.waziup.io/api/v2/devices?q=owner==muciajoe@gmail.com',
            {
                // mode:'cors',
                // headers: new Headers({
                //     'Accept':'application/json;charset=utf-8',
                //     'Authorization':`Bearer: ${token}`
                // })
                // headers:{
                //     'Authorization': `Bearer ${token}`,
                // }
            }
        );
        const data = await res.json();
        setLoading(false)
        setLoadedData(data)
        data.splice(0,1);
        
        return data        
    }

    getDevices(token)

    },[])


    
    // var reconnectTimeout = 2000;
    // var mqtt = new window['Paho'].MQTT.Client("api.waziup.io", Number(443), "/websocket", "clientjs");
    // var options = {
    //     useSSL: true,
    //     timeout: 5,
    //     onSuccess: onConnect,
    //     onFailure: onFailure};

    // mqtt.connect(options)     
    // mqtt.onMessageArrived = onMessageArrived;


    // function onConnect() {
    //     console.log("Connected to MQTT");
    //     mqtt.subscribe("devices/MyDevice/sensors/TC1/value");
    //   }

    // function onFailure(message) {
    //     console.log("Failed", message);
    //     setTimeout(window['MQTTconnect'], reconnectTimeout);
    // }

    // function onMessageArrived(msg) {
    //     console.log(msg.payloadString);
    //         // "New value: " + JSON.parse(msg.payloadString).value + " °C";
    // }
    
    return (
        // token?<Tank devices={(getDevices(token))}/>:<Login/>
        token?(
            loading?<div>Loading...</div>:<Tank devices = {loadedData}/>
        ):<Login/>
      
    );
}

export default MainPage;
