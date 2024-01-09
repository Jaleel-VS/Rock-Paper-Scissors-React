import { useRouter } from "next/router";

import React from 'react'

const WinnerPage = () => {
    const router = useRouter();
    const { winnerId } = router.query;

  return (
    <div>
        <h1>Winner is {winnerId}</h1>
    </div>
  )
}

export default WinnerPage