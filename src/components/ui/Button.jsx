import styles from './Button.module.css'

/**
 * @typedef {Object} ButtonProps
 * @property {string} label - Visible button text.
 * @property {string} [className] - Optional extra CSS class names.
 * @property {function(): void} [onClick] - Click handler.
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Native button type.
 * @property {boolean} [disabled=false] - Disables user interaction when true.
 */

/**
 * Reusable UI button with shared styles.
 *
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
function Button({label, className = '', onClick, type = 'button', disabled = false}) {
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`${className} ${styles.button}`}>{label}</button>
    );
}

export {Button};