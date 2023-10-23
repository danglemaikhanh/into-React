import React from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenZies] = React.useState(false)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)
    if (allHeld && allSameValue) {
      setTenZies(true)
    }
  }, [dice])

  function generalNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generalNewDice())
    }
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      setTenZies(!tenzies)
      setDice(allNewDice)
      setCount(0)
    } else {
      setCount(prevCount => prevCount += 1)
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generalNewDice()
      }))
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="text-container">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="container">
        {diceElements}
      </div>
      <p>Roll-Count: {count}</p>
      <button className="roll-btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}
