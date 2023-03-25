import styles from "@/styles/quiz.module.css";
import IPlayer from "@/interfaces/players";
import { firstRound } from "@/public/firstRoundQuestions";
import { useEffect, useState } from "react";

export default function Round1(props: {
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
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(undefined);
  const [numberDisplay, setNumberDisplay] = useState<number>(1);

  const { questions } = firstRound;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  function getRandomNumber() {
    const random = Math.floor(Math.random() * (questions.length));
    return random;
  }

  useEffect(() => {
    const firstNumber = getRandomNumber();
    setActiveQuestion(firstNumber);
    setQuestionsPosed([firstNumber]);
  }, []);

  useEffect(() => {
    if (props.player1.score >= 10 || props.player2.score >= 10) {
      props.setWhatToShow("streak");
  }}, [props.player1, props.player2])

  const onAnswerSelected = (answer: string, index: any) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const onClickNext = () => {
    setSelectedAnswerIndex(undefined);
    if (props.whichPlayer == 1) {
      props.setPlayer1((prev: IPlayer) =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 2,
              correctAnswers: prev.correctAnswers + 1,
            }
          : {
              ...prev,
              score: Math.max(prev.score - 1, 0),
              wrongAnswers: prev.wrongAnswers + 1,
            }
      );
    } else {
      props.setPlayer2((prev: IPlayer) =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 2,
              correctAnswers: prev.correctAnswers + 1,
            }
          : {
              ...prev,
              score: Math.max(prev.score - 1, 0),
              wrongAnswers: prev.wrongAnswers + 1,
            }
      );
    }
    let nextNumber: number;
    let counter: number = 0;
    if (questionsPosed.length == questions.length) {
      questionsPosed.splice(0)
      setQuestionsPosed(questionsPosed)
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
    props.setWhichPlayer(props.whichPlayer == 1 ? 2 : 1);
    setNumberDisplay((prev: number) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <div className={styles.resultBox}>
        <h1>Round 1</h1>
        <p>Correct answer = 2 points / Bad answer = -1 point</p>
        <div style={{ fontWeight: props.whichPlayer === 1 ? 'bold' : 'normal' }}>
          <span>{props.player1.name} </span>
          <span>{props.player1.score}</span>
        </div>
        <div style={{ fontWeight: props.whichPlayer === 2 ? 'bold' : 'normal' }}>
          <span>{props.player2.name} </span>
          <span>{props.player2.score}</span>
        </div>
      </div>

      <div>
        <p className={styles.activeQuestionNumber}>
          Question {numberDisplay}:
        </p>
      </div>
      <div className={styles.quiz}>
        <h2>{question}</h2>
        <form>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAnswerIndex === index
                    ? styles.selectedanswer
                    : undefined
                }
              >
                {answer}
              </li>
            ))}
          </ul>

          <div className={styles.flexright}>
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === undefined}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
