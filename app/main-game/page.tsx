"use client";

import React, { useState, useEffect } from 'react';
import './style.css'; // Ensure to create this CSS file
import useGameStore from '@/stores/gameStore';
import { useRouter } from 'next/navigation';

interface ResultState {
    player: string[];
    computer: string[];
}

type ResultKeys = 'player' | 'computer' | 'tie';

const GameScreen = () => {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const [playerChoice, setPlayerChoice] = useState<string>('');
    const [computerChoice, setComputerChoice] = useState<string>('');
    const [currentRound, setCurrentRound] = useState<number>(1);
    const [result, setResult] = useState<ResultState>({ player: [], computer: [] });
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const { playerName, rounds, setWinnerName, setFinalResult } = useGameStore();
    const winningEmoji: string = '🟢'
    const losingEmoji: string = '🔴'
    const tieEmoji: string = '🟡'
    const winsNeeded = Math.ceil(rounds / 2);
    const router = useRouter();
    const [highlightChoice, setHighlightChoice] = useState<string>(''); // New state for final choice highlighting
    const emojis = {
        player: { player: winningEmoji, computer: losingEmoji },
        computer: { player: losingEmoji, computer: winningEmoji },
        tie: { player: tieEmoji, computer: tieEmoji }
    };


    const [isChoosing, setIsChoosing] = useState<boolean>(false); // New state for animation


    const handleSubmit = () => {
        if (!playerChoice || isChoosing) return; // Prevent submit if no player choice or during animation

        makeComputerChoice(); // Initiates the computer's choice process
    };

    const makeComputerChoice = () => {
        setIsChoosing(true);
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setComputerChoice(choices[currentIndex]);
            currentIndex = (currentIndex + 1) % choices.length;
        }, 200); // Change choice every 200ms

        setTimeout(() => {
            clearInterval(intervalId);
            const randomChoice = choices[Math.floor(Math.random() * choices.length)];
            setComputerChoice(randomChoice); // Set the final choice
            setHighlightChoice(randomChoice); // Highlight the final choice
            setTimeout(() => {
                setIsChoosing(false); // Stop the choosing animation
                finalizeRound(randomChoice); // Finalize the round after highlighting
            }, 1000); // Highlight for 1 second
        }, 2000); // Run the loop for 2 seconds
    };

    const finalizeRound = (finalComputerChoice: string) => {
        setHighlightChoice('');
        setPlayerChoice('');
        
        let roundResult: ResultKeys;
        if (playerChoice === finalComputerChoice) {
            roundResult = 'tie';
        } else if (
            (playerChoice === 'Rock' && finalComputerChoice === 'Scissors') ||
            (playerChoice === 'Paper' && finalComputerChoice === 'Rock') ||
            (playerChoice === 'Scissors' && finalComputerChoice === 'Paper')
        ) {
            roundResult = 'player';
        } else {
            roundResult = 'computer';
        }
        
        setResult(prevResult => ({
            player: [...prevResult.player, emojis[roundResult].player],
            computer: [...prevResult.computer, emojis[roundResult].computer]
        }));
    
        setCurrentRound(prevRound => prevRound + 1);
    };
    
    // useEffect to check if the game is over
    useEffect(() => {
        const playerCount = result.player.filter(emoji => emoji === winningEmoji).length;
        const computerCount = result.computer.filter(emoji => emoji === winningEmoji).length;
    
        if (playerCount === winsNeeded || computerCount === winsNeeded) {
            setIsGameOver(true);
            const winner = playerCount === winsNeeded ? 'player' : 'computer';
            setWinnerName(winner === 'player' ? playerName : 'Computer');
            setFinalResult(`${result.player.join('')}-${result.computer.join('')}`);
            router.push(`/game-over/`);
        }
    }, [result]); // This effect will run every time the result changes

    
    const determineWinner = (updatedResult: ResultState) => {
        const playerCount = updatedResult.player.filter(emoji => emoji === winningEmoji).length;
        const computerCount = updatedResult.computer.filter(emoji => emoji === winningEmoji).length;
    
        if (playerCount === winsNeeded) {
            return 'player';
        } else if (computerCount === winsNeeded) {
            return 'computer';
        } else {
            return null;
        }
    }








    return (
        <div className="game-screen">
            <header>
                <h1>Rock Paper Scissors</h1>
            </header>
            <section className="game-info">
                <div className="player-info">
                    <h2>Player: </h2>
                    <p>{playerName}</p>
                </div>
                <div className="rounds-info">
                    <h2>Rounds</h2>
                    <p>{`Best of ${rounds}`}</p>
                </div>
                <div className="result-info">
                    <h2>Result</h2>
                    <p>{`Player:\n${result.player.join('')}`}</p>
                    <p>{`Computer:\n${result.computer.join('')}`}</p>
                </div>
            </section>


            <div className="choices player-choices">
                {choices.map(choice => (
                    <div
                        key={choice}
                        className={`choice-card ${playerChoice === choice ? 'selected' : ''}`}
                        onClick={() => setPlayerChoice(choice)}
                    >
                        {choice}
                    </div>
                ))}
            </div>

            <div className="vs-logo">VS</div>

            <div className="choices computer-choices">
                {choices.map(choice => (
                    <div
                        key={choice}
                        className={`choice-card ${computerChoice === choice && isChoosing ? 'highlight' : ''} ${highlightChoice === choice ? 'highlight-final' : ''}`}
                    >
                        {choice}
                    </div>
                ))}
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default GameScreen;
