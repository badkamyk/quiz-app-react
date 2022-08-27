import React from "react";

export default function Question(props) {

    function setBtnColor(option, id) {
        if (props.showAnswers) {
            if (props.questionInfo.correctAnswer === option) {
                return {backgroundColor: "#94D7A2"}
            } else if (props.questionInfo.selectedAnswer === id) {
                return {backgroundColor: "#F8BCBC"}
            } else {
                return {backgroundColor: "#F5F7FB"}
            }
        } else {
            return props.questionInfo.selectedAnswer === id ? {backgroundColor: "#D6DBF5"} : {backgroundColor: "#F5F7FB"}
        }

    }

    const options = props.questionInfo.options.map((option, optionId) => {
        return <button onClick={() => props.selectAnswer(optionId, props.id)} key={optionId}
                       style={setBtnColor(option, optionId)}
                       className="question--btn">{option.replaceAll("&#039;", "'")}</button>
    })


    return (
        <div className="question-container">
            <h3 className="question--quest">{props.questionInfo.question
                .replaceAll('&quot;', '"')
                .replaceAll('&rsquo;', "'")
                .replaceAll('&#039;', "'")}</h3>
            <div className="options-container">
                {options}
            </div>
            <div class="question--line"></div>
            <div className="background--part-up"></div>
            <div className="background--part-down"></div>
        </div>)
}