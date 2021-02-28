import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {
    const { minutes, seconds, hasFinish, isActive, resetCoutdown, startCountdown } = useContext(CountdownContext);
  
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.CountdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            { hasFinish && 
                <button disabled className={styles.CountdownButton}>
                    Ciclo encerrado
                </button>
            }
            {isActive && !hasFinish ? (
                <button onClick={resetCoutdown} type="button" className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}>
                    Abandonar ciclo
                </button>
            ): (
                <button onClick={startCountdown} type="button" className={styles.CountdownButton}>
                    Iniciar um ciclo
                </button>
            )}
        </div>
    )
};