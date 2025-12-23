import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './index.module.css';
import {SettingsForm} from "@/components/form/SettingsForm/SettingsForm.jsx";
import {Button} from "@/components/ui";
import {useGame} from "@/context/GameContext";

export function Introduction() {
    const [view, setView] = useState('menu');
    const {settings, saveSettings} = useGame(); // Дані з контексту
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
                        <Button label="Грати" onClick={() => navigate('/game')}/>
                        <Button label="Налаштування" onClick={() => setView('settings')}/>
                    </div>
                </div>
            )}
            {view === 'settings' && (
                <div className={styles.contentContainer}>
                    <SettingsForm initialSettings={settings} onSave={handleSaveSettings}/>
                    <Button label="Назад" onClick={() => setView('menu')}/>
                </div>
            )}
        </div>
    );
}