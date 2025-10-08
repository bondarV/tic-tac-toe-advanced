import './Button.css'

function Button({label, styles = '',onClick}) {
        console.log('Button onClick:', onClick); // Перевірте чи передається
    return (
        <button onClick={onClick} {...styles}>{label}</button>
    );
}

export { Button };