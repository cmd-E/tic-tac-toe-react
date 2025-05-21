import { useState } from 'react'
import Board from "./Board";

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)])
	const [currentMove, setCurrentMove] = useState(0)
	const [isAscSorting, setIsAscSorting] = useState(true)
	const xIsNext = currentMove % 2 === 0
	const currentSquares = history[currentMove]

	function jumpTo(nextMove) {
		setCurrentMove(nextMove)
	}

	function sortMoves() {
		setIsAscSorting(!isAscSorting)
	}

	const moves = history.slice(0, currentMove + 1).map((squares, move) => {
		let description = move > 0 ? `Go to move # ${move}` : 'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	})

	const displayedMoves = isAscSorting ? moves : moves
		.slice()
		.reverse()


	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1)
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board currentSquares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
			</div>
			<div className="game-info">
				<p>Game info:</p>
				<ol>{displayedMoves}</ol>
				<p>Sorting: <button onClick={sortMoves}>{isAscSorting ? 'DESC' : 'ASC'}</button></p>
			</div>
		</div>
	)
}