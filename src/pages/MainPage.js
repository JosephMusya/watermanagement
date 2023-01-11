import styles from './TankStyle.module.css';
function MainPage(){
    return (
    <div id="tank" className={styles.tank}>
        <div id="water-level" className="water-level"></div>
            <div class="wave">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
        </div>
    </div>
    );
}

export default MainPage;
