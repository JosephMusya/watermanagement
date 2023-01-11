import styles from './TankStyle.module.css';
function MainPage(){
    return (
        <div className={styles.mainPage}>
            <div>
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
                    <strong>Quantity:&nbsp;<span>30 Litres</span></strong>
                    <button className="btn text-white bg-primary">Close</button>
                    <button className='btn text-white bg-danger'>Open</button>
                </div>
                hhh
            </div>                  
        </div>
    
    );
}

export default MainPage;
