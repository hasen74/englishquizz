import Head from "next/head";
import styles from "@/styles/quiz.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Streak from "@/components/Streak";
import Confetti from "@/components/Confetti";
import IPlayer from "@/interfaces/players";
import Round1 from "@/components/Round1";
import Round2 from "@/components/Round2";
import Final from "@/components/FinalRound";

export default function Game() {
  const router = useRouter();
  const playersNames = router.query;
  const name1 = playersNames.player1?.toString();
  const name2 = playersNames.player2?.toString();

  const [player1, setPlayer1] = useState<IPlayer>({
    name: name1,
    score: 0,
    streak: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [player2, setPlayer2] = useState<IPlayer>({
    name: name2,
    score: 0,
    streak: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [whichPlayer, setWhichPlayer] = useState<number>(1);
  const [whatToShow, setWhatToShow] = useState<string>("round1");
  const [streakNumber, setStreakNumber] = useState<number>(1);

  return (
    <>
      <Head>
        <title>GOAT Verb Quiz Challenge</title>
        <meta name="description" content="Irregular Verb Quizz Contest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.quizcontainer}>
        {(() => {
          switch (whatToShow) {
           case "round1":
              return (
                <Round1
                  player1={player1}
                  player2={player2}
                  setPlayer1={setPlayer1}
                  setPlayer2={setPlayer2}
                  whichPlayer={whichPlayer}
                  setWhichPlayer={setWhichPlayer}
                  setWhatToShow={setWhatToShow}
                />
              );
            case "streak":
              return (
                <Streak
                  player={whichPlayer === 1 ? player2 : player1}
                  setPlayer={whichPlayer === 1 ? setPlayer2 : setPlayer1}
                  setWhatToShow={setWhatToShow}
                  streakNumber={streakNumber}
                  setStreakNumber={setStreakNumber}
                />
              );
            case "streak2":
              return (
                <Streak
                  player={whichPlayer === 1 ? player1 : player2}
                  setPlayer={whichPlayer === 1 ? setPlayer1 : setPlayer2}
                  setWhatToShow={setWhatToShow}
                  streakNumber={streakNumber}
                  setStreakNumber={setStreakNumber}
                />
              );
            case "round2":
              return (
                <Round2
                  player1={player1}
                  player2={player2}
                  setPlayer1={setPlayer1}
                  setPlayer2={setPlayer2}
                  whichPlayer={whichPlayer}
                  setWhichPlayer={setWhichPlayer}
                  setWhatToShow={setWhatToShow}
                />
              );
            case "final":
              return (
                <Final
                  player1={player1}
                  player2={player2}
                  setPlayer1={setPlayer1}
                  setPlayer2={setPlayer2}
                  whichPlayer={whichPlayer}
                  setWhichPlayer={setWhichPlayer}
                  setWhatToShow={setWhatToShow}
                />
              );
            case "results":
              return (
                <div className="result">
                  <Confetti />
                  <h3>Results</h3>
                  {player1.score >= 40 &&
                  <p style={{fontWeight: "bold"}}>Winner: {player1.name}!</p>}
                  {player2.score < 40 &&
                  <p>{player2.name}</p>}
                  <p>
                    Score:<span> {player1.score}</span>
                  </p>
                  <p>
                    Correct Answers:<span> {player1.correctAnswers}</span>
                  </p>
                  <p>
                    Streak:<span> {player1.streak}</span>
                  </p>
                  <p>
                    Wrong Answers:<span> {player1.wrongAnswers}</span>
                  </p>
                  {player2.score >= 40 &&
                  <p style={{fontWeight: "bold"}}>Winner: {player2.name}</p>}
                  {player2.score < 40 &&
                  <p>{player2.name}</p>}
                  <p>
                    Score:<span> {player2.score}</span>
                  </p>
                  <p>
                    Correct Answers:<span> {player2.correctAnswers}</span>
                  </p>
                  <p>
                    Streak:<span> {player2.streak}</span>
                  </p>
                  <p>
                    Wrong Answers:<span> {player2.wrongAnswers}</span>
                  </p>
                </div>
              );
            default:
              null;
          }
        })()}
      </div>
    </>
  );
}
