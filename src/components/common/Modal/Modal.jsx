import {createPortal} from 'react-dom';
import styles from './Modal.module.css';
import {useEffect} from "react";

const modalRoot = document.getElementById('modal-root');

/**
 * React type aliases for JSDoc.
 * @typedef {import('react').ReactNode} ReactNode
 */

/**
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Controls modal visibility.
 * @property {function(): void} onClose - Called on overlay click or Escape key.
 * @property {string | ReactNode} title - Modal header title (string or node).
 * @property {ReactNode} children - Modal body content.
 */

/**
 * Generic modal window rendered through a portal.
 *
 * @param {ModalProps} props
 * @returns {JSX.Element | null}
 */
export function Modal({isOpen, onClose, title, children}) {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
}