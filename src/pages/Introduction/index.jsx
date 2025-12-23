import {useState} from 'react';
import styles from './index.module.css';
import {GameSelection} from "./GameSelection.jsx";
import {SettingsForm} from "@/components/form/SettingsForm/SettingsForm.jsx";
import {Button} from "@/components/ui";
import {useGameSettings} from "@/hooks/useGameSettings.js";

export function Introduction({onNavigate}) {
    const [view, setView] = useState('menu');
    const {settings, saveSettings} = useGameSettings();

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
                            onClick={() => onNavigate('game')}
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

            {/* --- НАЛАШТУВАННЯ --- */}
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

            {view === 'game-selection' && (
                <div className={styles.contentContainer}>
                    <GameSelection onStartGame={() => onNavigate('game')}/>
                    <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'center'}}>
                        <Button
                            label="Назад в меню"
                            onClick={() => setView('menu')}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}