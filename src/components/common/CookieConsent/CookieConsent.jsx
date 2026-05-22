import {useEffect, useState} from 'react';
import {Button} from '@/components/ui';
import {Popup} from '@/components/common/Popup/Popup.jsx';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = 'cookieConsent';

function loadConsent() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        // Normalize shape and types
        if (typeof parsed !== 'object' || parsed === null) return null;
        return {
            necessary: parsed.necessary !== false, // default true
            analytics: !!parsed.analytics,
            marketing: !!parsed.marketing,
        };
    } catch {
        return null;
    }
}

function saveConsent(obj) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch {
        // ignore
    }
}

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [consent, setConsent] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const stored = loadConsent();
        if (!stored) {
            setVisible(true);
        } else {
            setConsent(stored);
            setVisible(false);
        }
    }, []);

    const acceptAll = () => {
        const newConsent = {necessary: true, analytics: true, marketing: true};
        setConsent(newConsent);
        saveConsent(newConsent);
        setVisible(false);
    };

    const rejectAll = () => {
        const newConsent = {necessary: true, analytics: false, marketing: false};
        setConsent(newConsent);
        saveConsent(newConsent);
        setVisible(false);
    };

    const openManage = () => {
        setModalOpen(true);
    };

    const savePreferences = () => {
        // ensure necessary always true
        const newConsent = {necessary: true, analytics: !!consent.analytics, marketing: !!consent.marketing};
        setConsent(newConsent);
        saveConsent(newConsent);
        setModalOpen(false);
        setVisible(false);
    };

    const toggle = (key) => {
        setConsent(prev => ({...prev, [key]: !prev[key]}));
    };

    if (!visible) return null;

    return (
        <>
            <div className={styles.banner} role="region" aria-label="cookie-consent">
                <div className={styles.content}>
                    <div className={styles.text}>
                        Цей сайт використовує файли cookie для покращення роботи. Ви можете погодитися на всі файли cookie або
                        налаштувати вибір за категоріями.
                    </div>
                    <div className={styles.actions}>
                        <Button label="Прийняти все" onClick={acceptAll} variant="primary" ariaLabel={false} />
                        <Button label="Відхилити все" onClick={rejectAll} variant="ghost" ariaLabel={false} />
                        <Button label="Налаштувати" onClick={openManage} variant="secondary" ariaLabel={false} />
                    </div>
                </div>
            </div>

            <Popup
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Налаштування cookie"
                subtitle="Виберіть категорії, які ви дозволяєте"
                size="sm"
                actions={[]}
                showFooter={false}
            >
                <div className={styles.prefList}>
                    <div className={styles.prefItem}>
                        <div className={styles.prefMain}>
                            <div className={styles.prefTitle}>Strictly Necessary</div>
                            <div className={styles.prefDesc}>Необхідні файли cookie забезпечують базову функціональність сайту.</div>
                        </div>
                        <div className={styles.prefControl}>
                            <input type="checkbox" checked disabled aria-label="necessary" />
                        </div>
                    </div>

                    <div className={styles.prefItem}>
                        <div className={styles.prefMain}>
                            <div className={styles.prefTitle}>Analytics</div>
                            <div className={styles.prefDesc}>Допомагає нам розуміти, як ви використовуєте сайт, щоб його покращувати.</div>
                        </div>
                        <div className={styles.prefControl}>
                            <input type="checkbox" checked={consent.analytics} onChange={() => toggle('analytics')} aria-label="analytics" />
                        </div>
                    </div>

                    <div className={styles.prefItem}>
                        <div className={styles.prefMain}>
                            <div className={styles.prefTitle}>Marketing</div>
                            <div className={styles.prefDesc}>Файли cookie для персоналізації реклами та маркетингових повідомлень.</div>
                        </div>
                        <div className={styles.prefControl}>
                            <input type="checkbox" checked={consent.marketing} onChange={() => toggle('marketing')} aria-label="marketing" />
                        </div>
                    </div>

                    <div className={styles.prefActions}>
                        <Button label="Зберегти" onClick={savePreferences} variant="primary" ariaLabel={false} />
                        <Button label="Відмінити" onClick={() => setModalOpen(false)} variant="ghost" ariaLabel={false} />
                    </div>
                </div>
            </Popup>
        </>
    );
}


