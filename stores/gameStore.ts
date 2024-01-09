import { create } from 'zustand'

interface State {
    playerName: string;
    rounds: number;
    setPlayerName: (name: string) => void;
    setRounds: (rounds: number) => void;
  }
  
  const useGameStore = create<State>((set) => ({
    playerName: 'Default Player Name',
    rounds: 3,
    setPlayerName: (name: string) => set(() => ({ playerName: name })),
    setRounds: (rounds: number) => set(() => ({ rounds: rounds })),
  }));

    export default useGameStore;