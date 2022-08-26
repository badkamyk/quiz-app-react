import React from "react";

export default function Start(props) {
    return (
        <div className="start--container">
            <h1 className="start--header">Quizzy</h1>
            <p className="start--description">Check your facts!</p>
            <button className="start--btn" onClick={props.handleClick}>Start quiz</button>
            <div className="background--part-up"></div>
            <div className="background--part-down"></div>
        </div>
    )
}