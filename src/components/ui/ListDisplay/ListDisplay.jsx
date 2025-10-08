import './ListDisplay.css'

function ListDisplay({children,className = ''}) {
    return (
        <ul className={`list-flex ${className}`}>
            {children}
        </ul>
    );
}
export {ListDisplay};