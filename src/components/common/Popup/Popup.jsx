import {createPortal} from 'react-dom';
import {useEffect, useId, useRef} from 'react';
import {Button} from '@/components/ui';
import styles from './Popup.module.css';

const popupRoot = document.getElementById('modal-root');

/**
 * React type aliases for JSDoc.
 * @typedef {*} ReactNode
 */

/**
 * @typedef {Object} PopupAction
 * @property {string} label - Button text.
 * @property {function(): void} onClick - Click handler.
 * @property {'primary' | 'secondary' | 'ghost' | 'danger'} [variant='primary'] - Button visual style.
 * @property {boolean} [disabled=false] - Disables the action button.
 */

/**
 * @typedef {Object} PopupProps
 * @property {boolean} isOpen - Controls popup visibility.
 * @property {string} title - Main popup title.
 * @property {string} [subtitle] - Optional supporting text.
 * @property {ReactNode} [children] - Optional popup body content.
 * @property {PopupAction[]} [actions] - Footer action buttons.
 * @property {function(): void} onClose - Called when the popup is dismissed.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Popup width preset.
 * @property {'neutral' | 'success' | 'warning' | 'danger'} [tone='neutral'] - Accent color preset.
 * @property {string} [closeLabel='Закрити'] - Close button label.
 * @property {boolean} [showFooter=true] - When false, footer is omitted entirely (useful when providing custom children actions).
 * @property {boolean} [showCloseAction=true] - Control whether the built-in close action is rendered when there are no actions.
 */

const toneClassNameMap = {
    neutral: styles.toneNeutral,
    success: styles.toneSuccess,
    warning: styles.toneWarning,
    danger: styles.toneDanger,
};

/**
 * Reusable popup window rendered through a portal.
 *
 * @param {PopupProps} props
 * @returns {JSX.Element | null}
 */
export function Popup({
    isOpen,
    title,
    subtitle,
    children,
    actions = [],
    onClose,
    size = 'md',
    tone = 'neutral',
    closeLabel = 'Закрити',
    showFooter = true,
    showCloseAction = true,
}) {
    const titleId = useId();
    const subtitleId = useId();
    const bodyId = useId();
    const panelRef = useRef(null);
    const previousActiveElementRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        // save previous active element to restore focus on close
        previousActiveElementRef.current = document.activeElement;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            // focus trap behaviour
            if (event.key === 'Tab' && panelRef.current) {
                const focusable = getFocusableElements(panelRef.current);
                if (focusable.length === 0) {
                    event.preventDefault();
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === first || document.activeElement === panelRef.current) {
                        last.focus();
                        event.preventDefault();
                    }
                } else {
                    if (document.activeElement === last) {
                        first.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // set initial focus after mount
        requestAnimationFrame(() => {
            if (!panelRef.current) return;
            const focusable = getFocusableElements(panelRef.current);
            if (focusable.length > 0) {
                focusable[0].focus();
            } else {
                // make panel focusable and focus it
                panelRef.current.setAttribute('tabindex', '-1');
                panelRef.current.focus();
            }
        });

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
            // restore focus to previously active element
            try {
                previousActiveElementRef.current?.focus?.();
            } catch {
                // ignore
            }
        };
    }, [isOpen, onClose]);

    if (!isOpen || !popupRoot) {
        return null;
    }

    const toneClassName = toneClassNameMap[tone] ?? toneClassNameMap.neutral;
    const descriptionIds = [subtitle ? subtitleId : null, children ? bodyId : null].filter(Boolean).join(' ');

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <section
                aria-labelledby={titleId}
                aria-describedby={descriptionIds || undefined}
                aria-modal="true"
                className={`${styles.panel} ${styles[size] ?? styles.md} ${toneClassName}`.trim()}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                ref={panelRef}
            >
                <div className={styles.header}>
                    <div className={styles.headingGroup}>
                        <p className={styles.eyebrow}>Спливаюче вікно</p>
                        <h2 id={titleId} className={styles.title}>{title}</h2>
                        {subtitle && <p id={subtitleId} className={styles.subtitle}>{subtitle}</p>}
                    </div>
                    <button className={styles.closeButton} onClick={onClose} type="button" aria-label={closeLabel}>
                        &times;
                    </button>
                </div>

                {children && (
                    <div className={styles.body} id={bodyId}>
                        {children}
                    </div>
                )}
                {showFooter && (
                    <div className={styles.footer}>
                        {actions.length > 0 ? (
                            actions.map(({label, onClick, variant = 'primary', disabled = false}, index) => (
                                <Button
                                    key={`${label}-${index}`}
                                    label={label}
                                    onClick={onClick}
                                    variant={variant}
                                    disabled={disabled}
                                    ariaLabel={false}
                                />
                            ))
                        ) : (
                            showCloseAction && closeLabel ? (
                                <Button label={closeLabel} onClick={onClose} variant="ghost" className={styles.closeAction} ariaLabel={false} />
                            ) : null
                        )}
                    </div>
                )}
            </section>
        </div>,
        popupRoot,
    );
}

/**
 * Return focusable elements within a container in DOM order.
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
function getFocusableElements(container) {
    const selectors = [
        'a[href]:not([tabindex="-1"])',
        'button:not([disabled]):not([tabindex="-1"])',
        'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
        'select:not([disabled]):not([tabindex="-1"])',
        'textarea:not([disabled]):not([tabindex="-1"])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    return Array.from(container.querySelectorAll(selectors)).filter((el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
}

