import Square from "./Square"

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
			return squares[a];
		}
	}
	return null;
}

export default function Board({ xIsNext, currentSquares: squares, onPlay }) {
	const winner = calculateWinner(squares);

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
				const index = row * 3 + col;
				squaresInRow.push(
					<Square
						key={`square-${index}`}
						value={squares[index]}
						onSquareClick={() => handleClick(index)}
					/>
				);
			}

			rows.push(
				<div key={`row-${row}`} className="board-row">
					{squaresInRow}
				</div>
			);
		}

		return rows;
	}

	return (
		<>
			<div className="status">{status}</div>
			{renderBoard()}
		</>
	);
}
