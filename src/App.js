import React, { useEffect, useState } from 'react'
import Die from './components/Die'
import "./SCSS/App.scss"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    /*Extras:
    CSS: Put real dots on the dices
    Track the number of rolls
    Track the time it took to win
    Save your best time to localStorage
    */

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    useEffect(() => {
        console.log("Dice state has changed");
        const allIsHeld = (value) => value.isHeld === true
        const allEqual = (value) => value.value === dice[0].value
        if (dice.every(allIsHeld) && dice.every(allEqual)) {
            console.log("YOU HAVE WON");
            setTenzies(true)
        }
    }, [dice])

    function randomNumber() {
        return Math.ceil(Math.random() * 6)
    }

    // function generateNewDie() {
    //     return {
    //         value: Math.ceil(Math.random() * 6),
    //         isHeld: false,
    //         id: nanoid()
    //     }
    // } Code mẫu

    function allNewDice() {
        let objs = [];
        for (let i = 0; i < 10; i++) {
            objs.push({
                id: nanoid(),
                value: randomNumber(), // Có thể đổi thành generateNewDie()
                isHeld: false
            })
        }
        return objs
    }

    function holdDice(event, id) {
        event.stopPropagation();
        setDice(prevDice => prevDice.map(die => {
            if (die.id === id) {
                return {
                    ...die, isHeld: !die.isHeld //Có thể dùng Ternary operator
                }
            }
            return die
        }))
    }

    function rollDice() {
        if (!tenzies) {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld === false ? { ...die, value: randomNumber() } // có thể return thành generateNewDice()
                    : die
            }))
        } else {
            setDice(allNewDice())
            setTenzies(!tenzies)
        }
    }

    return (
        <main className='main'>
            {tenzies && <Confetti />}
            <div className='title'>
                <h1>Tenzies</h1>
                <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
            </div>
            <div className='dices--container'>
                {dice.map((value, index) => (
                    <Die value={value.value} key={value.id} id={value.id} isHeld={value.isHeld} onClick={holdDice} /> // có thể pass onClick = {() => holdDice(value.id)}
                ))}
            </div>
            <button className='roll--dice' onClick={rollDice}>{tenzies ? "NEW GAME" : "ROLL"}</button>
        </main>
    )
}