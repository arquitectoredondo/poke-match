import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/bullbasaur.png", matched: false },
  { src: "/img/charmander.png", matched: false },
  { src: "/img/chikorita.png", matched: false },
  { src: "/img/cyndaquil.png", matched: false },
  { src: "/img/squirtle.png", matched: false },
  { src: "/img/totodile.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showButton, setShowButton] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setShowButton(true);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automatically
  /*   useEffect(() => {
    shuffleCards();
  }, []); */

  return (
    <div className="App">
      <h1>Poke Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      {!showButton && (
        <div>
          <h4>Are you ready? Press new game!</h4>
          <img className="banner" src="./img/banner.png" alt="Pokemon banner" />
        </div>
      )}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {showButton && <h3>Turns: {turns}</h3>}
    </div>
  );
}

export default App;
