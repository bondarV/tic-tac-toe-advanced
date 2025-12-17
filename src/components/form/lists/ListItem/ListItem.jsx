import styles from './ListItem.module.css'
function ListItem({className = '',children}) {
    return (
        <li className={`${(styles.listItem ? styles.listItem : '').trim()} ${className}`}>
            {children}
        </li>
    );

}

export {ListItem};