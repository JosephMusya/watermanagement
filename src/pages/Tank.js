import styles from './TankStyle.module.css';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';

function Tank(props){  
    // console.log(props.devices)
    function mqttSubscription(devices){        
        var reconnectTimeout = 2000;
        var mqtt = new window['Paho'].MQTT.Client("api.waziup.io", Number(443), "/websocket", "clientjs");
        var options = {
            useSSL: true,
            timeout: 5,
            onSuccess: onConnect,
            onFailure: onFailure};

        mqtt.connect(options)     
        mqtt.onMessageArrived = onMessageArrived;

        
        function onConnect() {
            console.log("Connected!")
            devices.map((device)=>{
                (device.sensors).map(sensors=>{
                    console.log(sensors.name)
                })
            }) 
            mqtt.subscribe("devices/MyDevice/sensors/TC1/value");
            console.log("Subscribed to MQTT");
          }

        function onFailure(message) {
            console.log("Failed", message);
            setTimeout(window['MQTTconnect'], reconnectTimeout);
        }

        function onMessageArrived(msg) {
            console.log(msg.payloadString);
        }

    }   
        
    return (        
        <div className={styles.mainPage}>
            {useEffect(()=>{mqttSubscription(props.devices)},[])}
            {
                
                props.devices.map((device)=>{
                    return <div className={styles.tankElement} key={device.id}>
                        <div>
                            <h2>{device.name}</h2>
                            <div id="tank" className={styles.tank}>
                            <div id="water-level" className={styles.waterlevel}></div>
                                <div className={styles.wave}>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                    <div className={styles.box}></div>
                                </div>
                            </div>
                            <div className={styles.controls}>
                                <strong>Quantity:&nbsp;<span>300 Litres</span></strong>
                                <button className="btn text-white bg-primary">Close</button>
                                <button className='btn text-white bg-danger'>Open</button>                        
                            </div> 
                            <Link to='/tank-setup' className='badge bg-danger btn fs-5 rounded-pill'>Setup</Link>
                        </div>                               
                    </div> 
                })
            }             
            <hr />                                      
        </div>
    );
}

export default Tank;
