import styles from './Setup.module.css';
function TankSetup(){
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
    return(
        <div className={styles.main}>
            <div className={styles.setup}>
                <h2>Tank Setup</h2>                
                <h3>Capacity</h3>
                <form className={styles.form}>
                    <div>
                        <label forhtml="max-level">Max Level</label>
                        <input className="form-control" type="number" min="0" defaultValue={1000} onChange={maxLevelHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div>
                        <label htmlFor="min-level">Min Level</label>
                        <input className="form-control" type="number" min="0" defaultValue={0} onChange={minLevelHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                <hr/>
                <h3>Alarms</h3>
                    <div>
                        <label htmlFor="max-level">Max Level</label>
                        <input className="form-control" type="number" min="0" defaultValue={1000} onChange={maxAlarmHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div>
                        <label htmlFor="max-level">Min Level</label>
                        <input className="form-control" type="number" min="0" defaultValue={10} onChange={minAlarmHandler}/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div className={styles.submit}>
                        <button>Complete Setup</button>
                    </div>
                </form>
            </div>
        </div>       
    );
}

export default TankSetup;
