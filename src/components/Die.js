import React from "react";

export default function Die(props) {
    return (
        <button className="grid-item" style={{
            backgroundColor: props.isHeld ? "#59E391" : "#FFF"
        }} onClick={(event) => props.onClick(event, props.id)}>
            {props.value}
        </button >
    )
}
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>
    // <button className="grid-item">1</button>