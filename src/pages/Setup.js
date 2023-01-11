import styles from './Setup.module.css';
function TankSetup(){
    return(
        <div className={styles.main}>
            <div className={styles.setup}>
                <h2>Tank Setup</h2>
                <strong htmlFor="Tank-Type">Tank Type</strong>
                <select className="form-control" name="Tank" id="tank-type">
                    <option value="Cylindrical">Cylindrical</option>
                    <option value="Cubic">Cubic</option>
                </select>
                <h3>Capacity</h3>
                <form className={styles.form}>
                    <div>
                        <label forhtml="max-level">Max Level</label>
                        <input className="form-control" type="number" min="0" value="1000"/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div>
                        <label htmlFor="max-level">Min Level</label>
                        <input className="form-control" type="number" min="0" value="0"/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                <hr/>
                <h3>Alarms</h3>
                    <div>
                        <label htmlFor="max-level">Max Level</label>
                        <input className="form-control" type="number" min="0" value="900"/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                    <div>
                        <label htmlFor="max-level">Min Level</label>
                        <input className="form-control" type="number" min="0" value="100"/>
                        <label htmlFor="max-level">Lts</label>
                    </div>
                </form>
            </div>
        </div>       
    );
}

export default TankSetup;
