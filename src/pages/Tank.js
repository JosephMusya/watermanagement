import styles from './TankStyle.module.css';
import {Link} from 'react-router-dom';

function Tank(props){  
    console.log(props.devices)  
    return (
        <div className={styles.mainPage}>
            <div className={styles.tankElement}>
                <div>
                    <h2>Rooftop Tank</h2>
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
            <hr />                                      
        </div>
    );
}

export default Tank;
