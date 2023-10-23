import React from "react"

export default function Die(props) {
    const greenBg = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }
    return (
        <div className="dies" style={greenBg} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}