import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './index.module.css';
import {SettingsForm} from "@/components/form/SettingsForm/SettingsForm.jsx";
import {Button} from "@/components/ui";
import {selectSettings, updateSettings} from "@/store/slices/settingsSlice";

export function Introduction() {
    const [view, setView] = useState('menu');
    const navigate = useNavigate();

    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();

    const handleSaveSettings = (newSettings) => {
        dispatch(updateSettings(newSettings));
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