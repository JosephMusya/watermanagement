import styles from './TankStyle.module.css';
import {Link} from 'react-router-dom';
import {useEffect,useState,useRef} from 'react';

function Tank(props){  
    const [currentValue, setCurrentValue] = useState(0) 
    const [switchState, setSwitchState] = useState(false)
    const minCapacity = window.localStorage.getItem('minLevel')
    const lowLevel = window.localStorage.getItem('minAlarm')
    const upperLevel = window.localStorage.getItem('maxAlarm')
    const tankCapacity = window.localStorage.getItem('maxLevel')

    const switchRef = useRef()
    
    function switchHandler(event){
        return (props.devices).map(device=>{
            const devId = device.id
            return (device.actuators).map(act=>{
                const actId = act.id 
                const url = 'https://api.waziup.io/api/v2/devices/'+devId+'/actuators'
                const value = Boolean(event.target.value)

                fetch(
                    url,
                    {
                        method: 'POST',   
                        headers: new Headers({
                            'Content-Type':'application/json;charset=utf-8',
                            'Authorization':'Bearer '+props.token,
                        }),
                        body: JSON.stringify({
                            'value':value,
                            'id':actId
                        })                    
                    }                                
                ).then((data)=>{
                    console.log(data)
                })

            })
            
                       
        })
        
    }

    function mqttSubscription(devices){   
        const actualTankHeight = window.localStorage.getItem('height')    //cm        
        var reconnectTimeout = 2000;
        var mqtt = new window['Paho'].MQTT.Client("api.waziup.io", Number(443), "/websocket", "clientjs");
        var options = {
            useSSL: true,
            timeout: 5,
            onSuccess: onConnect,
            onFailure: onFailure};

        mqtt.connect(options)     
        mqtt.onMessageArrived = onMessageArrived;
        
        async function getData(url,type) {
            const res = await fetch(url);
            const data = await res.json();
            
            if (type==='pump'){
                console.log("Pump initial State: ",data.value)
                setSwitchState(data.value)
            }

            else if (type='USS'){
                console.log("Water Level initial level: %d cm",data.value['value'])
                setTank(data.value['value']);
            }            
        }

        function onConnect() {
            console.log("Connected!")            
            return devices.map((device)=>{                
                const deviceId = device.id
                const baseUrl = "devices/"+deviceId
                device.actuators.map(actuator=>{
                    const pumpUrl = baseUrl + "/actuators/"+actuator.id
                    getData('https://api.waziup.io/api/v2/'+pumpUrl,actuator.name)
                })
                device.sensors.map(sensor=>{
                    //Filter the device you need updates from
                    if(sensor.sensor_kind==='WaterLevel'){
                        const sensorUrl =baseUrl + "/sensors/"+sensor.id                                                                      
                        mqtt.subscribe(baseUrl+"/#")
                        console.log("Subscribed to tank updates")
                        getData('https://api.waziup.io/api/v2/'+sensorUrl,sensor.name)
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
            const tankHeight = document.getElementById('tank').offsetHeight
            const currentHeight = tankHeight*ratio            
            for (let i=0;i<=currentHeight;i++){
                document.getElementById("water-level").style.height = i+'px'
            }  
            const currentCapacity = ratio*tankCapacity 
            setCurrentValue(currentCapacity)
            if (currentCapacity > upperLevel){
                alert("Maximum water level reached!")
            }
            if (currentCapacity < lowLevel){
                alert("Lowest water level reached!")
            }
        }

        function onMessageArrived(msg) {
            const val = (JSON.parse(msg.payloadString).value)

            val ?  setTank(val) : setSwitchState(JSON.parse(msg.payloadString))
  
            console.log("Received :> ",JSON.parse(msg.payloadString))                                
        }
    }   
        
    return (        
        <div className={styles.mainPage}>
            {useEffect(()=>{mqttSubscription(props.devices)},[])}
            {                
                props.devices.map((device)=>{
                    return <div className={styles.tankElement} key={device.id}>
                        <div>
                            <h2>{device.name} - {tankCapacity} Litres </h2>
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
                                {
                                    switchState ? <button className="btn text-white bg-primary" ref={switchRef} value={false} onClick={switchHandler} >Close Pump</button>:
                                    <button className='btn text-white bg-primary' ref={switchRef} value={true} onClick={switchHandler} >Open Pump</button> 
                                }
                                
                                                       
                            </div> 
                            <Link to='/tank-setup' className='badge bg-danger btn fs-5 rounded-pill'>Setup</Link>
                        </div>   
                    </div> 
                },
                <br/>,
                )
            }
        </div>
    );
}

export default Tank;
