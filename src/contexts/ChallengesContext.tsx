import Cookie from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
export const ChallengeContext = createContext({} as ChallengeContextData);

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp(): void;
    startNewChallgen(): void;
    activeChallenge: Challenge | null;
    resetChallenge(): void;
    experienceToNextLeve: number;
    completeChallenge(): void;
    closeLevelUpModal(): void;
}

interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface ChallengeProviderProps extends HomeProps {
    children: ReactNode;
}


export function ChallengesProvider({ children, ...rest}: ChallengeProviderProps): JSX.Element {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrenceExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNextLeve = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookie.set('level', String(level));
        Cookie.set('currentExperience', String(currentExperience));
        Cookie.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience,challengesCompleted]);

    function levelUp(): void {
        setLevel(level +1);
        setIsLevelUpModalOpen(true);
    }

    function startNewChallgen(): void {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[ramdomChallengeIndex];

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🥳', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
        setActiveChallenge(challenge);
    }

    function resetChallenge(): void {
        setActiveChallenge(null);
    }

    function completeChallenge(): void {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLeve) {
            finalExperience = finalExperience - experienceToNextLeve;
            levelUp();
        }

        setCurrenceExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function closeLevelUpModal(): void {
        setIsLevelUpModalOpen(false);
    }
 
    return (
        <ChallengeContext.Provider value={{ level, 
                                            levelUp, 
                                            currentExperience, 
                                            challengesCompleted,
                                            startNewChallgen,
                                            activeChallenge,
                                            resetChallenge,
                                            experienceToNextLeve,
                                            completeChallenge,
                                            closeLevelUpModal
                                            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}