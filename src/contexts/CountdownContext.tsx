import { createContext, ReactNode, useState, useContext, useEffect} from "react";
import { ChallengeContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinish: boolean;
    isActive: boolean;
    startCountdown(): void;
    resetCoutdown(): void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);
    const { startNewChallgen } = useContext(ChallengeContext);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(): void {
        setIsActive(true);
    }

    function resetCoutdown(): void {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinish(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinish(true);
            setIsActive(false);
            startNewChallgen();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinish,
            isActive,
            startCountdown,
            resetCoutdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}