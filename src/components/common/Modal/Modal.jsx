import {createPortal} from 'react-dom';
import {Button} from '@/components/ui';
import styles from './Modal.module.css';


const modalRoot = document.getElementById('modal-root');

export function Modal({isOpen, onClose, title, children, actions}) {
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
                <div className={styles.footer}>
                    {actions || <Button onClick={onClose}>Close</Button>}
                </div>
            </div>
        </div>,
        modalRoot
    );
}