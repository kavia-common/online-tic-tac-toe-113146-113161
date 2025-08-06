import React, { useState } from 'react';
import './App.css';

// Color palette for the game (matching requirements)
const COLORS = {
  primary: '#1976d2',
  accent: '#fbc02d',
  secondary: '#424242'
};

// Helper to determine the winner and winning line
// Returns {winner: 'X'|'O'|null, line: [i,j,k]|null, isDraw: bool}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c], isDraw: false };
    }
  }
  const isDraw = squares.every(Boolean);
  return { winner: null, line: null, isDraw };
}

// PUBLIC_INTERFACE
function App() {
  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const result = calculateWinner(squares);

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (result.winner || squares[idx]) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderSquare(i) {
    const isWinSquare = result.line && result.line.includes(i);
    return (
      <button
        key={i}
        className={`ttt-square${isWinSquare ? ' win' : ''}`}
        style={{
          color: squares[i] === 'X'
            ? COLORS.primary
            : squares[i] === 'O'
            ? COLORS.accent
            : COLORS.secondary,
          borderColor: isWinSquare ? COLORS.accent : COLORS.secondary,
          background: isWinSquare ? '#fffbe7' : '#fff',
        }}
        onClick={() => handleClick(i)}
        aria-label={`Tic Tac Toe Cell ${i + 1}, ${squares[i] ? (squares[i] === 'X' ? 'X' : 'O') : 'empty'}`}
      >
        {squares[i]}
      </button>
    );
  }

  let status;
  if (result.winner) {
    status = (
      <span>
        <span className="ttt-status-winner">{result.winner}</span> wins!
      </span>
    );
  } else if (result.isDraw) {
    status = <span className="ttt-status-draw">It's a draw!</span>;
  } else {
    status = (
      <span>
        Turn:&nbsp;
        <span
          className={
            xIsNext ? 'ttt-turn-x' : 'ttt-turn-o'
          }
          style={{
            color: xIsNext ? COLORS.primary : COLORS.accent
          }}
        >
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  return (
    <div className="ttt-app-outer">
      <div className="ttt-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status">{status}</div>
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
          {Array(3)
            .fill(null)
            .map((_, row) => (
              <div key={row} className="ttt-board-row">
                {Array(3)
                  .fill(null)
                  .map((_, col) => renderSquare(row * 3 + col))}
              </div>
            ))}
        </div>
        <button className="ttt-restart-btn" onClick={handleRestart} aria-label="Restart game">
          Restart
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          <span className="ttt-x-color">X</span>: Player 1 &nbsp;
          <span className="ttt-o-color">O</span>: Player 2
        </span>
      </footer>
    </div>
  );
}

export default App;
