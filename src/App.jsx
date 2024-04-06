import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";

import { WINNER_COMBOS, WINNER_STATES, TURNS } from "./utils/constants";
import Square from "./utils/Square";
import CurrentTurn from "./utils/currentTurn";

function App() {
  //cargamos la data desde el local storage
  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem("board");
    if (boardStorage) return JSON.parse(boardStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem("turn");

    if (turnStorage) return turnStorage;
    return TURNS.O;
  });

  const [winner, setWinner] = useState(WINNER_STATES.none);

  const [currentTurn, setNumberTurn] = useState(() => {
    const currentData = window.localStorage.getItem("turnCount");
    if (currentData) return currentData;
    return 1;
  });

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo; //hacemos todos los elementos del array a una variable

      if (
        //cheks all the positions
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        confetti();
        return boardToCheck[a];
      }
    }
    return WINNER_STATES.none;
  };

  const updateBoard = (index) => {
    if (board[index] || winner) {
      return;
    }
    //updates the turn number
    setNumberTurn(currentTurn + 1);
    //invertimos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //creamos otra array igual a la original
    const newBoard = [...board];
    //actualizamos la copia
    newBoard[index] = turn;

    setBoard(newBoard);
    //actualizamos el local storage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", turn);
    window.localStorage.setItem("turnCount", currentTurn);
    console.log(currentTurn);
    //ver si hay un winner
    const isWinner = checkWinner(newBoard);

    if (isWinner) {
      console.log(isWinner);
      setWinner(isWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.O);
    setWinner(null);
    setNumberTurn(1);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
    window.localStorage.removeItem("turnCount");
  };

  console.log(currentTurn >= 9);
  let resetButtonClass = currentTurn >= 9 ? "reset visible" : "reset";

  if (currentTurn <= 9) {
    resetButtonClass = winner ? "reset visible" : "reset";
  }

  return (
    <div id="board " className="">
      <h1 className="flex text-4xl font-bold justify-center my-20">
        Tic tac toe
      </h1>
      <div className="grid grid-cols-3 grid-rows-3 w-96 h-96 mx-auto my-2">
        {board.map((item, index) => {
          //renderizamos el square con un span adentro que tenga el turno correspondiente del array, accediento con el identificador 'index'
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              <span className="m-auto text-[3rem]">{board[index]}</span>
            </Square>
          );
        })}
      </div>

      <div className="currentTurn flex justify-center">
        <CurrentTurn
          isSelected={turn == TURNS.O}
          letter={TURNS.O}
          winner={winner}
        ></CurrentTurn>
        <CurrentTurn
          isSelected={turn == TURNS.X}
          letter={TURNS.X}
          winner={winner}
        ></CurrentTurn>
      </div>

      <button
        onClick={resetGame}
        className={
          "flex mx-auto my-2 justify-center px-2 py-1 text-xl bg-neutral-800 outline outline-2 outline-neutral-900 w-20 rounded-2xl transition-all hover:scale-105 hover:outline-white active:bg-blue-700 " +
          resetButtonClass
        }
      >
        Reset
      </button>
    </div>
  );
}

export default App;
