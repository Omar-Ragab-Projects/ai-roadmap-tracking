"use client";

import React, { useState, useEffect } from "react";

type Player = "X" | "O" | null;

export default function XOGame() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [playerSymbol] = useState<Player>(() =>
    Math.random() < 0.5 ? "X" : "O"
  );
  const [computerSymbol] = useState<Player>(() =>
    playerSymbol === "X" ? "O" : "X"
  );
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [isComputerTurn, setIsComputerTurn] = useState(
    () => Math.random() < 0.5
  );

  const checkWinner = (squares: Player[]): Player | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      return "draw";
    }

    return null;
  };

  const getAvailableMoves = (squares: Player[]): number[] => {
    return squares
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];
  };

  const makeComputerMove = (squares: Player[]) => {
    const availableMoves = getAvailableMoves(squares);
    if (availableMoves.length === 0) return;

    const randomIndex =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    setTimeout(() => {
      const newBoard = [...squares];
      newBoard[randomIndex] = computerSymbol;
      setBoard(newBoard);
      setIsComputerTurn(false);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      }
    }, 500);
  };

  useEffect(() => {
    if (isComputerTurn && !winner) {
      makeComputerMove(board);
    }
  }, [isComputerTurn, winner, board]);

  const handleClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (board[index] || winner || isComputerTurn) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsComputerTurn(true);
    }
  };

  const getStatusMessage = () => {
    if (winner === "draw") return "It's a draw!";
    if (winner) {
      if (winner === playerSymbol) return "You win! 🎉";
      return "Computer wins!";
    }
    if (isComputerTurn) return "Computer is thinking...";
    return `Your turn (${playerSymbol})`;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="text-xl font-bold">{getStatusMessage()}</div>

      <ul className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(index, e);
              }}
              disabled={!!cell || !!winner || isComputerTurn}
              className={`w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors ${
                cell || winner || isComputerTurn
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-300 cursor-pointer"
              } ${cell === "X" ? "text-blue-600" : "text-red-600"}`}
            >
              {cell}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
