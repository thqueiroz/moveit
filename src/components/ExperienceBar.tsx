import { FaLightbulb } from 'react-icons/fa';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLeve } = useContext(ChallengeContext);
    const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLeve);
    return (
        <header className={styles.experienceBar}>
            <button className={styles.LightIcon}>
                <FaLightbulb />
            </button>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%`}}>
                    <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} xp</span>
                </div>  
            </div>
            <span>{experienceToNextLeve} px</span>
        </header>
    );
}