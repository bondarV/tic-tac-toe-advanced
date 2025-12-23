import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Button} from '@/components/ui';
import styles from './SettingsForm.module.css';

const schema = yup.object({
    playerX: yup.string().required("Ім'я гравця X обов'язкове").min(2, "Мін. 2 символи"),
    playerO: yup.string().required("Ім'я гравця O обов'язкове").min(2, "Мін. 2 символи"),
    timeLimit: yup.number().min(0, "Не може бути від'ємним").typeError('Має бути числом'),
    gridSize: yup.number().min(3, "Мін. 3x3").max(10, "Макс. 10x10").typeError('Має бути числом').required(),
}).required();

export function SettingsForm({initialSettings, onSave}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: initialSettings,
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        onSave(data);
        alert('Налаштування збережено!');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
                <label>Гравець X:</label>
                <input {...register("playerX")} />
                <p className={styles.error}>{errors.playerX?.message}</p>
            </div>

            <div className={styles.field}>
                <label>Гравець O:</label>
                <input {...register("playerO")} />
                <p className={styles.error}>{errors.playerO?.message}</p>
            </div>

            <div className={styles.field}>
                <label>Таймер (сек, 0 = без обмежень):</label>
                <input type="number" {...register("timeLimit")} />
                <p className={styles.error}>{errors.timeLimit?.message}</p>
            </div>

            <div className={styles.field}>
                <label>Розмір поля (3-10):</label>
                <input type="number" {...register("gridSize")} />
                <p className={styles.error}>{errors.gridSize?.message}</p>
            </div>

            <Button type="submit" label="Зберегти налаштування"/>
        </form>
    );
}