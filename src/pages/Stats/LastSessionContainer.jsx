import styles from "./LastSessionContainer.module.css";

function LastSessionContainer() {
    return (
        <div style={{backgroundColor: '#4CB963'}}>
            <p className={`${styles['centralized-text']}`}>Ось ваші останні проведені двобої:</p>
        </div>
    );
}

export {LastSessionContainer};