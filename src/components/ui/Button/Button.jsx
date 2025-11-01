import './Button.css'

function Button({label, styles = '',onClick}) {
    return (
        <button onClick={onClick} {...styles}>{label}</button>
    );
}

export { Button };