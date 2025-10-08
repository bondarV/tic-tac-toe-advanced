import './Button.css'

function Button({label, styles}) {
    return (
        <button {...styles}>{label}</button>
    );
}

export { Button };