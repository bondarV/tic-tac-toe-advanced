import styles from './Button.module.css'

function Button({label, className = '', onClick}) {
    return (
        <button onClick={onClick} className={`${className} ${styles.button}`}></button>
    );
}

export {Button};