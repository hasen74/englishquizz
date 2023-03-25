import styles from "@/styles/quiz.module.css";
import IPlayer from "@/interfaces/players";
import { useEffect, useState } from "react";
import { finalRound } from "@/public/finalRoundQuestions";

export default function Final(props: {
  player1: IPlayer;
  player2: IPlayer;
  setPlayer1: any;
  setPlayer2: any;
  whichPlayer: number;
  setWhichPlayer: any;
  setWhatToShow: any;
}) {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [questionsPosed, setQuestionsPosed] = useState<number[]>([]);
  const [numberDisplay, setNumberDisplay] = useState<number>(1);
  const [answer, setAnswer] = useState<string>("");

  const { questions } = finalRound;
  const { question, verb, correctAnswer } = questions[activeQuestion];

  function getRandomNumber() {
    const random = Math.floor(Math.random() * questions.length);
    return random;
  }

  useEffect(() => {
    const firstNumber = getRandomNumber();
    setActiveQuestion(firstNumber);
    setQuestionsPosed([firstNumber]);
  }, []);

  useEffect(() => {
    if (props.player1.score >= 40 || props.player2.score >= 40) {
      props.setWhatToShow("results");
    }
  }, [props.player1, props.player2]);

  const onClickFinalNext = () => {
    if (props.whichPlayer == 1) {
      props.setPlayer1((prev: IPlayer) =>
        (answer.toLowerCase() === correctAnswer)
          ? {
              ...prev,
              score: prev.score + 5,
              correctAnswers: prev.correctAnswers + 1,
            }
          : {
              ...prev,
              wrongAnswers: prev.wrongAnswers + 1,
          })
    } else {
      props.setPlayer2((prev: IPlayer) =>
        (answer.toLowerCase() === correctAnswer)
          ? {
              ...prev,
              score: prev.score + 5,
              correctAnswers: prev.correctAnswers + 1,
            }
          : {
              ...prev,
              wrongAnswers: prev.wrongAnswers + 1,
            }
      );
    }
    setAnswer("")
    let nextNumber: number;
    let counter: number = 0;
    if (questionsPosed.length === questions.length) {
      questionsPosed.splice(0);
      setQuestionsPosed(questionsPosed);
    }
    do {
      nextNumber = getRandomNumber();
      if (!questionsPosed.includes(nextNumber)) {
        counter = 0;
      } else {
        counter++;
      }
    } while (counter != 0);
    setActiveQuestion(nextNumber);
    questionsPosed.push(nextNumber);
    setQuestionsPosed(questionsPosed);
    props.setWhichPlayer(props.whichPlayer === 1 ? 2 : 1);
    setNumberDisplay((prev: number) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <div className={styles.resultBox}>
        <h1>Final Challenge</h1>
        <p>Each correct answer will get you 5 points.</p>
        <p>Be the first to reach 40 points to win!</p>
        <div
          style={{ fontWeight: props.whichPlayer === 1 ? "bold" : "normal" }}
        >
          <span>{props.player1.name} </span>
          <span>{props.player1.score}</span>
        </div>
        <div
          style={{ fontWeight: props.whichPlayer === 2 ? "bold" : "normal" }}
        >
          <span>{props.player2.name} </span>
          <span>{props.player2.score}</span>
        </div>
      </div>

      <div>
        <p className={styles.activeQuestionNumber}>Question {numberDisplay}</p>
      </div>
      <div className={styles.quiz}>
        <h2>{question}</h2>
        <p>{verb}</p>
        <form>
          <ul>
            <li>
              <label htmlFor="answer">Answer:</label>
            </li>
            <li>
              <input
                type="text"
                name="answer"
                id="answer"
                onChange={(event) => setAnswer(event.target.value)}
                value={answer}
              />
            </li>
          </ul>
          <div className={styles.flexright}>
            <button onClick={onClickFinalNext}
            disabled={answer === ''}
            >Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}
