import React, { ReactNode, createContext, useContext, useState } from 'react';

interface GameProviderProps {
    children: ReactNode;
}

interface IGameContext {
    playerName: string;
    setPlayerName: (name: string) => void;
    rounds: number;
    setRounds: (rounds: number) => void;
    currentRound: number;
    setCurrentRound: (round: number) => void;
    score: { player: number; computer: number };
    setScore: (score: { player: number; computer: number }) => void;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const defaultContext: IGameContext = {
    playerName: '',
    setPlayerName: () => {},
    rounds: 1,
    setRounds: () => {},
    currentRound: 1,
    setCurrentRound: () => {},
    score: { player: 0, computer: 0 },
    setScore: () => {},
    showModal: false,
    setShowModal: () => {}
};

const GameContext = createContext<IGameContext>(defaultContext);

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider');
    }

    return context;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [playerName, setPlayerName] = useState<string>('');
    const [rounds, setRounds] = useState<number>(1);
    const [currentRound, setCurrentRound] = useState<number>(1);
    const [score, setScore] = useState<{ player: number; computer: number }>({ player: 0, computer: 0 });
    const [showModal, setShowModal] = useState<boolean>(false);

    const value = {
        playerName,
        setPlayerName,
        rounds,
        setRounds,
        currentRound,
        setCurrentRound,
        score,
        setScore,
        showModal,
        setShowModal
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
