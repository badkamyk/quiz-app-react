import './App.css';
import Question from "./components/Question";
import Start from "./components/Start";
import React, {useState, useEffect} from "react";

function App() {
    const [showStart, setShowStart] = useState(true);
    const [allComplete, setAllComplete] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    const [score, setScore] = useState(0);

    function startGame() {
        setShowStart(false);
    }

    function selectAnswer(optionId, questionId) {
        setQuestions(prevQuestions => prevQuestions.map((quest, id) => {
            return questionId === id ? {...quest, selectedAnswer: optionId} : quest
        }))
    }

    function playAgain() {
        setShowAnswers(false);
        setAllComplete(false);
        setShowStart(true);
        setScore(0);
    }

    function checkAnswers() {
        setShowAnswers(true)
    }

    useEffect(_ => {
        if (showStart) {
            async function getQuestions() {
                const res = await fetch("https://opentdb.com/api.php?amount=5");
                const data = await res.json();
                setQuestions(data.results.map(question => {
                    return ({
                        question: question.question,
                        options: question.incorrect_answers.concat([question.correct_answer]).sort(_ => Math.random() - 0.5),
                        correctAnswer: question.correct_answer,
                        selectedAnswer: undefined
                    })
                }))
            }

            getQuestions();
        }

    }, [showStart])

    useEffect(_ => {
        setAllComplete(questions.every(question => typeof question.selectedAnswer !== "undefined"));
    }, [questions])

    useEffect(_ => {
        if (showAnswers) {
            for (const question of questions) {
                if (question.correctAnswer === question.options[question.selectedAnswer]) {
                    setScore(prevScore => prevScore + 1)
                }
            }
        }

    }, [showAnswers])

    const renderQuestions = questions.map((questionInfo, id) => {
        return (<Question
            key={id}
            id={id}
            questionInfo={questionInfo}
            showAnswers={showAnswers}
            selectAnswer={selectAnswer}
        />)
    })
    return (
        <div>
            {!showStart ?
                <div>
                    {renderQuestions}
                </div>
                : <Start handleClick={startGame}/>
            }
            {showAnswers ?
                <div className="endGame-container">
                    <p className="endGame--score">You scored {score} correct answers</p>
                    <button onClick={playAgain} className="endGame--btn">Play again</button>
                </div>
                : <button disabled={!allComplete} onClick={checkAnswers} className="check--btn">Check answers</button>

            }
        </div>
    );
}

export default App;
