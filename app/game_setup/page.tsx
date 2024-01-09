"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';
import Link from 'next/link';
import useGameStore from '@/stores/gameStore';



const GameSetup = () => {
  const [localPlayerName, setLocalPlayerName] = useState('');
  const [localRounds, setLocalRounds] = useState(1);
  const router = useRouter();
  const roundsOptions = [1, 3, 5, 7];

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setLocalPlayerName(name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (localPlayerName === '') {
      alert('Please enter your name');
      return;
    }

    useGameStore.setState({ playerName: localPlayerName, rounds: localRounds });
    router.push('/main-game');
  };

  const selectRounds = (round: number) => {
    setLocalRounds(round);
  };

  return (
    <>
      <header className="game-setup-header">
        <h1>Game setup 🎮</h1>
      </header>
      <div className="game-setup">
        <form onSubmit={handleSubmit} className="game-setup-form">
          <div className="name-input">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={localPlayerName}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="rounds-header">
            <h2>How many rounds?: </h2>
          </div>

          <div className="rounds-selection">
            {roundsOptions.map((round) => (
              <div
                key={round}
                className={`rounds-card ${round === localRounds ? 'selected' : ''}`}
                onClick={() => selectRounds(round)}
              >
                {round}
              </div>
            ))}
          </div>

          <button className="btn">Start</button>
        </form>
      </div>
    </>
  );
};

export default GameSetup;