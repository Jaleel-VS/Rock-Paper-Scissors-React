import Image from 'next/image'
import styles from './page.module.css'
import './styles/home.css';
import Link from 'next/link';
// Home page for rock paper scissors game
export default function Home() {
  return (
<div className="background-container">
            <div className="overlay"></div>
            {/* Your foreground content here */}
            <div className="content">
                <h1>Rock Paper Scissors!</h1>
                <Link href="./game_setup"><button className="btn">Play</button></Link>
            </div>
        </div>
  )
}
