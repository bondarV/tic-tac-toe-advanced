import styles from './Button.module.css'

/**
 * @typedef {Object} ButtonProps
 * @property {string} label - Visible button text.
 * @property {string} [className] - Optional extra CSS class names.
 * @property {function(): void} [onClick] - Click handler.
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Native button type.
 * @property {boolean} [disabled=false] - Disables user interaction when true.
 * @property {'primary' | 'secondary' | 'ghost' | 'danger'} [variant='primary'] - Visual style preset.
 */

/**
 * Reusable UI button with shared styles.
 *
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
function Button({label, className = '', onClick, type = 'button', disabled = false, variant = 'primary'}) {
    const variantClassName = styles[variant] ?? '';

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={[styles.button, variantClassName, className].filter(Boolean).join(' ')}>{label}</button>
    );
}

export {Button};