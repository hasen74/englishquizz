import styles from "@/styles/quiz.module.css";
import IPlayer from "@/interfaces/players";
import VerbsInterface from "@/interfaces/verbs";
import Link from "next/link";
import { useEffect, useState } from "react";
import AudioPlayerButton from "./AudioPlayerButton";
import CountdownTimer from "./Timer";
import ModalAnimals from "./ModalAnimals";
import { animals } from "@/public/animalQuestions";

export default function StreakQuestions(props: {
  player: IPlayer;
  setPlayer: any;
  verbsData: string;
  setWhatToShow: any;
  streakNumber: number;
  setStreakNumber: any;
}) {
  const dataJson = JSON.parse(props.verbsData);
  const verbs: VerbsInterface[] = dataJson.verbs;
  const [streakShow, setStreakShow] = useState<string>("welcome");
  const [animalsShow, setAnimalsShow] = useState<boolean>(false)
  const [randomNumber, setRandomNumber] = useState<number>(getRandomNumber());
  const [writtenCase, setWrittenCase] = useState<boolean>(true);
  const [verbAudio, setVerbAudio] = useState<any>();
  const [pastSimple, setPastSimple] = useState<string>("");
  const [pastParticiple, setPastParticiple] = useState<string>("");
  const [pastSimpleInput, setPastSimpleInput] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(0);
  const [error, setError] = useState<number>(0);
  const [endTime, setEndtime] = useState<boolean>(false);

  const { animalQuizzes } = animals;
  const [activeAnimalQuestion, setActiveAnimalQuestion] = useState<number>(getRandomAniNumber());
  const { choices, correctAnswer } = animalQuizzes[activeAnimalQuestion];

  function getRandomAniNumber() {
    const random = Math.floor(Math.random() * (animalQuizzes.length));
    return random;
  }

  function getRandomNumber() {
    const random = Math.floor(Math.random() * (verbs.length));
    return random;
  }
  
  function onClickVerbs(event: any) {
    event.preventDefault();
    if (pastSimpleInput) {
      if (pastSimple.toLowerCase() === verbs[randomNumber].Pastsimple) {
        const audio = new Audio(`/mp3/${verbs[randomNumber].Pastsimple}.mp3`);
        audio.play();
        setPastSimpleInput(!pastSimpleInput);
        setPastSimple("");
        setPastParticiple("");
      } else {
        const randomAnimal = getRandomAniNumber()
        setActiveAnimalQuestion(randomAnimal)
        const audio = new Audio(`/mp3/animals/${animalQuizzes[randomAnimal].correctAnswer}.mp3`);
        console.log(activeAnimalQuestion, choices, correctAnswer )
        audio.play();
        setAnimalsShow(true)
        setError((prev) => prev + 1);
      }
    }
    if (!pastSimpleInput) {
      if (pastParticiple.toLowerCase() === verbs[randomNumber].PastParticiple) {
        props.setPlayer((prev: IPlayer) => ({
          ...prev,
          score: prev.score + 1,
          streak: prev.streak + 1,
        }));  
        const audio = new Audio(
          `/mp3/${verbs[randomNumber].PastParticiple}.mp3`
        );
        audio.play();
        setPastSimple("");
        setPastParticiple("");
        setStreak((prev) => prev + 1);
        setPastSimpleInput(!pastSimpleInput);
        const newWrittenCase = !writtenCase
        setWrittenCase(newWrittenCase);
        const random: number = getRandomNumber()
        const newAudio = new Audio(`/mp3/${verbs[random].Base}.mp3`)
        setVerbAudio(newAudio)
        setRandomNumber(random)
        setTimeout(() => {
          if (!newWrittenCase) {
          newAudio.play()
          }
        }, 900)
      } else {
        const randomAnimal = getRandomAniNumber()
        setActiveAnimalQuestion(randomAnimal)
        const audio = new Audio(`/mp3/animals/${animalQuizzes[randomAnimal].correctAnswer}.mp3`);
        audio.play();
        setAnimalsShow(true)
        setError((prev) => prev + 1);
      }
    }
  }

  const launch = () => {
    setStreakShow("go");
  };

  const onComeBack = () => {
    if (props.streakNumber == 1) {
      props.setWhatToShow("streak2");
      props.setStreakNumber(2);
      setStreak(0);
      setStreakShow("welcome");
      setEndtime(false);
      setWrittenCase(true);
      setAnimalsShow(false);
      setPastSimpleInput(true);
      setPastSimple("");
      setPastParticiple("");
      const random = Math.floor(Math.random() * 100)
      setRandomNumber(random);
    } else {
      props.setWhatToShow("round2");
    }
  };

  useEffect(() => {
  const number: number = getRandomAniNumber()
  setActiveAnimalQuestion(number) }, []
  )

  useEffect(() => {
    if (endTime) {
      setStreakShow("end");
    }
  }, [endTime]);

  return (
    <div className={styles.quizcontainer}>
      {streakShow === "welcome" && (
        <div>
          <p style={{ fontWeight: "bold" }}>{props.player.name},</p>
          <p>it's time for your irregular verb streak challenge !</p>
          <p>
            Enter the past simple and past participles forms of the words you
            hear or see to win some extra points. Hit the button "play again" to
            hear the verb base again.
          </p>
          <p>
            You got 60 seconds to guess as many verbs as possible. You'll get 2
            points for each verb you guess.
          </p>
          <p>Ready?</p>
          <button onClick={launch}>Go!</button>
        </div>
      )}
      {streakShow === "go" && (
        <div>
             {animalsShow && 
          <div>
            <div>Animals</div>
            <ModalAnimals 
            setStreakShow={setStreakShow}
            setAnimalsShow={setAnimalsShow}
            choices={choices}
            correctAnswer={correctAnswer}
            randomization={getRandomAniNumber()}/>
          </div>
        }
          <div style={{ fontWeight: "bold" }}>
            <p>{props.player.name}</p>
            <span>Streak: </span>
            <span>{streak}</span>
            <CountdownTimer setEndtime={setEndtime} />
          </div>
          {writtenCase ? (
            <div>
              <p>{verbs[randomNumber].Base}</p>
            </div>
          ) : (
            <div>
              <AudioPlayerButton src={verbAudio} />
            </div>
          )}
          <form>
            <ul>
              {pastSimpleInput ? (
                <div>
                  <li>
                    <label htmlFor="pastsimple">Past simple:</label>
                  </li>
                  <li>
                    <input
                      type="text"
                      name="pastsimple"
                      id="pastsimple"
                      onChange={(event) => setPastSimple(event.target.value)}
                      value={pastSimple}
                    />
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <label htmlFor="pastparticiple">Past participle:</label>
                  </li>
                  <li>
                    <input
                      type="text"
                      name="pastparticiple"
                      id="pastpariciple"
                      onChange={(event) =>
                        setPastParticiple(event.target.value)
                      }
                      value={pastParticiple}
                    />
                  </li>
                </div>
              )}
            </ul>
            <div>
              <button
                onClick={onClickVerbs}
                disabled={pastSimple === "" && pastParticiple === ""}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}
      {streakShow === "end" && (
        <div>
          <p>
            You earned {streak} bonus points. Click next to move on to the next
            phase.
          </p>
          <Link href="/game">
            <button onClick={onComeBack}>Next</button>
          </Link>
        </div>
      )}
    </div>
  );
}
