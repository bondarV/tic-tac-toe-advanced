import './ListItem.css'
function ListItem({className = '',children}) {
    return (
        <li className={`list-item ${className}`}>
            {children}
        </li>
    );

}

export {ListItem};