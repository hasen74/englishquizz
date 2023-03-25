import Head from "next/head";
import styles from "@/styles/quiz.module.css";
import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/Modal";
import ModalDialog from "@/components/Modal";

export default function Home() {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const buttonIsEnabled = player1.length > 0 && player2.length > 0; // condition to block registration

  return (
    <>
      <Head>
        <title>GOAT Verb Quiz Challenge</title>
        <meta name="description" content="Irregular Verb Quizz Contest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.quizcontainer}>
        <div>
          <h1>VERB CHALLENGE EXTRAVAGANZA</h1>
          <p>Welcome! You are about to compete in a quiz-inspired game.</p>
          <p>The first player to reach 40 points wins!</p>
          <p>If you want to learn more about verbs and conjugation, click the link below.</p>
          <ModalDialog element="Learn more!"/>
         <p>Please enter your names and click start to launch the game.</p>
          <form>
            <ul>
            <li>
                <label htmlFor="player1">Player 1 </label>
                <input
                  type="text"
                  name="palyer1"
                  id="player1"
                  onChange={(event) => setPlayer1(event.target.value)}
                  value={player1}
                />
              </li>
              <li>
                <label htmlFor="player2">Player 2</label>
                {" "}
                <input
                  type="text"
                  name="player2"
                  id="player2"
                  onChange={(event) => setPlayer2(event.target.value)}
                  value={player2}
                />
              </li>
            </ul>
            <Link
              href={{
                pathname: "/game",
                query: {
                  player1: player1,
                  player2: player2,
                },
              }}
            >
              <button disabled={!buttonIsEnabled}>Start game</button>
            </Link>
          </form>
        </div>
      </main>
    </>
  );
}
