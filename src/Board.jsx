import Square from "./Square"
import styles from "./styles/board.module.css"

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

	for (const [a, b, c] of lines) {
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return [squares[a], [a, b, c]]
		}
	}
	return [null, []];
}

export default function Board({ xIsNext, currentSquares: squares, onPlay }) {
	const [winner, winnerLine] = calculateWinner(squares);

	const status = winner
		? `Winner: ${winner}`
		: `Next player: ${xIsNext ? "X" : "O"}`;

	function handleClick(i) {
		if (squares[i] || winner) return;

		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares);
	}

	function renderBoard() {
		const rows = [];

		for (let row = 0; row < 3; row++) {
			const squaresInRow = [];

			for (let col = 0; col < 3; col++) {
				const index = row * 3 + col; // calculates the amount of squares in general

				squaresInRow.push(
					<Square
						key={`square-${index}`}
						value={squares[index]}
						isWinner={winnerLine.includes(index)}
						onSquareClick={() => handleClick(index)}
					/>
				);
			}

			rows.push(
				<div key={`row-${row}`} className={styles.boardRow}>
					{squaresInRow}
				</div>
			);
		}

		return rows;
	}

	return (
		<>
			<div className={styles.status}>{status}</div>
			{renderBoard()}
		</>
	);
}
