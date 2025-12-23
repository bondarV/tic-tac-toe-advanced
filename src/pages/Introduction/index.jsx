import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './index.module.css';
import {SettingsForm} from "@/components/form/SettingsForm/SettingsForm.jsx";
import {Button} from "@/components/ui";
import {useGame} from "@/context/GameContext";

export function Introduction() {
    const [view, setView] = useState('menu');
    const {settings, saveSettings} = useGame();
    const navigate = useNavigate();

    const handleSaveSettings = (newSettings) => {
        saveSettings(newSettings);
        setView('menu');
    };

    return (
        <div className={styles.introductionPageContainer}>
            {view === 'menu' && (
                <div className={styles.menuContainer}>
                    <h1 className={styles.gameTitle}>TIC TAC TOE</h1>
                    <div className={styles.menuButtons}>
                        <Button
                            label="Грати"
                            onClick={() => navigate('/game')}
                            className={styles.menuBtn}
                        />
                        <Button
                            label="Налаштування"
                            onClick={() => setView('settings')}
                            className={styles.menuBtn}
                        />
                    </div>
                </div>
            )}

            {view === 'settings' && (
                <div className={styles.contentContainer}>
                    <h2>Налаштування гри</h2>
                    <SettingsForm
                        initialSettings={settings}
                        onSave={handleSaveSettings}
                    />
                    <div style={{marginTop: '1rem'}}>
                        <Button
                            label="Назад"
                            onClick={() => setView('menu')}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}