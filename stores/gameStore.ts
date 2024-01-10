import { create } from 'zustand'

interface State {
    playerName: string;
    rounds: number;
    winnerName: string;
    finalResult: string;
    setPlayerName: (name: string) => void;
    setRounds: (rounds: number) => void;
    setWinnerName: (name: string) => void;
    setFinalResult: (result: string) => void;
  }
  
  const useGameStore = create<State>((set) => ({
    playerName: 'Default Player Name',
    rounds: 3,
    winnerName: '',
    finalResult: '',
    setPlayerName: (name: string) => set(() => ({ playerName: name })),
    setRounds: (rounds: number) => set(() => ({ rounds: rounds })),
    setWinnerName: (name: string) => set(() => ({ winnerName: name })),
    setFinalResult: (result: string) => set(() => ({ finalResult: result })),
  }));

    export default useGameStore;