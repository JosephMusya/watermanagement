import {LoginContext} from '../providers/LoginProvider';
import {useContext} from 'react';
import Login from './Login';
import Tank from './Tank';

function MainPage(){
    const [token, ] = useContext(LoginContext);
    var reconnectTimeout = 2000;
    var mqtt = new window['Paho'].MQTT.Client("api.waziup.io", Number(443), "/websocket", "clientjs");
    // window['mqtt'].onMessageArrived = onMessageArrived;
    var options = {
        useSSL: true,
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure};

    mqtt.connect(options)     
    mqtt.onMessageArrived = onMessageArrived;


    function onConnect() {
        console.log("Connected to MQTT");
        mqtt.subscribe("devices/MyDevice/sensors/TC1/value");
      }

    function onFailure(message) {
        console.log("Failed", message);
        setTimeout(window['MQTTconnect'], reconnectTimeout);
    }

    function onMessageArrived(msg) {
        console.log(msg.payloadString);
            // "New value: " + JSON.parse(msg.payloadString).value + " °C";
    }
    
    return (
        token ?
        <Tank/>:
        <Login/>
    );
}

export default MainPage;
