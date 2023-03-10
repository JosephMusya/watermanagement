import styles from './Setup.module.css';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom'

function TankSetup(){
    const navigate = useNavigate();
    const maxLevelRef = useRef();
    const minLevelRef = useRef();
    const maxAlarmRef = useRef();
    const minAlarmRef = useRef();
    const heightRef = useRef();

    const minCapacity = window.localStorage.getItem('minLevel')
    const lowLevel = window.localStorage.getItem('minAlarm')
    const upperLevel = window.localStorage.getItem('maxAlarm')
    const tankCapacity = window.localStorage.getItem('maxLevel')
    const tankHeight = window.localStorage.getItem('height')

    const maxLevelHandler = (e) => {
        console.log("Max Level: ",e.target.value);
    }

    const minLevelHandler = (e) => {
        console.log("Min Level: ",e.target.value)
    }

    const maxAlarmHandler  = (e) => {
        console.log("Alarm Max: ",e.target.value)
    }
    const minAlarmHandler = (e) => {
        console.log("Alarm Max: ", e.target.value)
    }

    const submitHandler = () => {
       const maxLevel = maxLevelRef.current.value;
       const minLevel = minLevelRef.current.value;
       const maxAlarm = maxAlarmRef.current.value;
       const minAlarm = minAlarmRef.current.value;
       const height = heightRef.current.value;

       window.localStorage.setItem('maxLevel',maxLevel);
       window.localStorage.setItem('minLevel',minLevel);
       window.localStorage.setItem('maxAlarm',maxAlarm);
       window.localStorage.setItem('minAlarm',minAlarm);
       window.localStorage.setItem('height',height);

        navigate('/')
    }
    return(
        <div className={styles.main}>
            <div className={styles.setup}>
                <h2>Tank Setup</h2>                
                <h3>Capacity</h3>
                <form className={styles.form}>
                    <div>
                        <label forhtml="max-level">Max Capacity</label>
                        <input className="form-control" ref={maxLevelRef} type="number" min="0" defaultValue={tankCapacity} onChange={maxLevelHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div>
                        <label htmlFor="min-level">Min Capcity</label>
                        <input className="form-control" ref={minLevelRef} type="number" min="0" defaultValue={minCapacity} onChange={minLevelHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div>
                        <label htmlFor="tankHeight">Tank Height</label>
                        <input className="form-control" ref={heightRef} type="number" min="0" defaultValue={tankHeight}/>
                        <label htmlFor="max-level">CM</label>
                    </div>
                <hr/>
                <h3>Alarms</h3>
                    <div>
                        <label htmlFor="max-level">Max Capcity</label>
                        <input className="form-control" ref={maxAlarmRef} type="number" min="0" defaultValue={upperLevel} onChange={maxAlarmHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div>
                        <label htmlFor="max-level">Min Capacity</label>
                        <input className="form-control" ref={minAlarmRef} type="number" min="0" defaultValue={lowLevel} onChange={minAlarmHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>

                    <div className={styles.submit}>
                        <button onClick={submitHandler}>Complete Setup</button>
                    </div>
                </form>
            </div>
        </div>       
    );
}

export default TankSetup;
