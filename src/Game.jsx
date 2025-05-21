import { useState, useMemo } from 'react';
import Board from './Board';

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [isAscSorting, setIsAscSorting] = useState(true);

	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(move) {
		setCurrentMove(move);
	}

	function sortMoves() {
		setIsAscSorting(value => !value);
	}

	const displayedMoves = useMemo(() => {
		const moves = history.slice(0, currentMove + 1).map((_, move) => {
			const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
			return (
				<li key={move}>
					<button onClick={() => jumpTo(move)} disabled={move === currentMove}>
						{description}
					</button>
				</li>
			);
		});
		return isAscSorting ? moves : moves.slice().reverse();
	}, [history, currentMove, isAscSorting]);

	return (
		<div className="game">
			<div className="game-board">
				<Board currentSquares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
			</div>
			<div className="game-info">
				<p>Game info:</p>
				<p>
					Sorting:
					<button onClick={sortMoves}>
						{isAscSorting ? 'DESC' : 'ASC'}
					</button>
				</p>
				<ol>{displayedMoves}</ol>
			</div>
		</div>
	);
}
