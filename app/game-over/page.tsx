"use client";

import { useRouter } from "next/navigation";
import useGameStore from "@/stores/gameStore";

import React from 'react'

const WinnerPage = () => {
  const { winnerName, finalResult } = useGameStore();
  const router = useRouter();

  const getResultString = () => {
    const parseResult = finalResult.split('-');
    const playerScore = parseResult[0];
    const computerScore = parseResult[1];

    const message = winnerName === 'Computer'
      ? `Unfortunately, you lost the game 😢\n Here is the final result: You: ${playerScore} - CPU: ${computerScore}`
      : `Congratulations, ${winnerName}! You won the game 🎉\n Here is the final result: You: ${playerScore} - CPU: ${computerScore}`;

    return message.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      height: '100vh'
    }}>
      <h1>Game Over</h1>
      <h2>{getResultString()}</h2>
      <button onClick={() => router.push('/')}>Play again?</button>
    </div>
  )
}

export default WinnerPage;
