import styles from './TankStyle.module.css';
import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';

function Tank(props){  
    const [currentValue,setCurrentValue] = useState(0)    
    function mqttSubscription(devices){   
        const actualTankHeight = 50     
        var reconnectTimeout = 2000;
        var mqtt = new window['Paho'].MQTT.Client("api.waziup.io", Number(443), "/websocket", "clientjs");
        var options = {
            useSSL: true,
            timeout: 5,
            onSuccess: onConnect,
            onFailure: onFailure};

        mqtt.connect(options)     
        mqtt.onMessageArrived = onMessageArrived;
        
        async function getSensorData(url) {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.value['value'])
            setTank(data.value['value']);
        }

        function onConnect() {
            console.log("Connected!")
            devices.map((device)=>{
                const deviceId = device.id
                return (device.sensors).map(sensor=>{
                    if(sensor.name==='analogInput 3'){
                        const subUrl = "devices/"+deviceId+"/sensors/"+sensor.id                                                                      
                        mqtt.subscribe(subUrl+"/value")
                        console.log("Subscribed to ", sensor.name)
                        getSensorData('https://api.waziup.io/api/v2/'+subUrl)                       
                    }
                })
            })             
          }

        function onFailure(message) {
            console.log("Failed: ", message);
            setTimeout(window['MQTTconnect'], reconnectTimeout);
        }

        function setTank(val){
            const ratio = (val/actualTankHeight)
            const tankCapacity = 1000
            const tankHeight = document.getElementById('tank').offsetHeight
            const prevHeight = document.getElementById("water-level").offsetHeight
            const currentHeight = tankHeight*ratio            
            for (let i=0;i<=currentHeight;i++){
                document.getElementById("water-level").style.height = i+'px'
            }   
            setCurrentValue(ratio*tankCapacity)
        }

        function onMessageArrived(msg) {
            const value = (JSON.parse(msg.payloadString)).value;
            console.log("Received ",value)            
            setTank(value)                      
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
                                <strong>Quantity:&nbsp;<span>{currentValue.toFixed(2)} Litres</span></strong>
                                <button className="btn text-white bg-primary">Close</button>
                                <button className='btn text-white bg-danger'>Open</button>                        
                            </div> 
                            <Link to='/tank-setup' className='badge bg-danger btn fs-5 rounded-pill'>Setup</Link>
                        </div>   
                    </div> 
                })
            }             
        </div>
    );
}

export default Tank;
