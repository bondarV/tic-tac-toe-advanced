import styles from './Button.module.css'

/**
 * @typedef {Object} ButtonProps
 * @property {string} label - Visible button text.
 * @property {string} [className] - Optional extra CSS class names.
 * @property {function(): void} [onClick] - Click handler.
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Native button type.
 * @property {boolean} [disabled=false] - Disables user interaction when true.
 * @property {'primary' | 'secondary' | 'ghost' | 'danger'} [variant='primary'] - Visual style preset.
 * @property {string|false} [ariaLabel] - Accessibility label. Pass string to set aria-label, pass false to indicate the visible label is sufficient (no aria-label will be rendered).
 */

/**
 * Reusable UI button with shared styles.
 *
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
function Button({label, className = '', onClick, type = 'button', disabled = false, variant = 'primary', ariaLabel}) {
    const variantClassName = styles[variant] ?? '';

    // If ariaLabel is explicitly false we DO NOT render an aria-label attribute (visible label is sufficient).
    // If ariaLabel is a string we pass it through. If undefined, the attribute is omitted.
    const ariaAttr = ariaLabel === false ? undefined : ariaLabel;

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaAttr}
            className={[styles.button, variantClassName, className].filter(Boolean).join(' ')}
        >
            {label}
        </button>
    );
}

export {Button};