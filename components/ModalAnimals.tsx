import React, { useState } from 'react'
import styles from "@/styles/quiz.module.css";

// Modalbox allowing email to be sent from gmail or copied to clipboard
function ModalAnimals(props: any) {

  const [selectedAnimalAnswer, setSelectedAnimalAnswer] = useState<boolean>();
  const [selectedAniAnswerIndex, setSelectedAniAnswerIndex] = useState();

  const onAnswerSelected = (answer: string, index: any) => {
    const firstAnswer: boolean = false;
    setSelectedAnimalAnswer(firstAnswer)
    setSelectedAniAnswerIndex(index);
    if (answer === props.correctAnswer) {
      setSelectedAnimalAnswer(true);
    } else {
      setSelectedAnimalAnswer(false);
    }
  };

  // Function to close the box and end the streak challenge
  const onClickAnimal = () => {
    selectedAnimalAnswer ? (
      props.setAnimalsShow(false)
    ) : (
      props.setStreakShow("end")
    )
  }

  return (
    <div>
        <div className="modal">
          <div className="modal-content">
          <div>
            <h2>Wrong! Get another chance:</h2>
        <h2 className={styles.activeQuestionNumber}>
          what animal sound did you just hear?
        </h2>
      </div>
      <div className={styles.quiz}>
        <form>
          <ul>
            {props.choices.map((answer: string, index: number) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAniAnswerIndex === index
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
              onClick={onClickAnimal}
              disabled={selectedAniAnswerIndex === undefined}
            >
              Next
            </button>
          </div>
        </form>
      </div>
            </div>
          </div>
    </div>
  )
}

export default ModalAnimals
