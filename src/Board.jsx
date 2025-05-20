import Square from "./Square"

export default function Board({ xIsNext, currentSquares: squares, onPlay }) {
	const board = []
	let row = []
	let rowIndex = 0

	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X"
		} else {
			nextSquares[i] = "O"
		}
		onPlay(nextSquares)
	}

	const winner = calculateWinner(squares)
	let status
	if (winner) {
		status = `Winner: ${winner}`
	} else {
		status = `Next player: ${xIsNext ? "X" : "O"}`
	}

	for (let i = 0; i < 9; i++) {
		if (i % 3 === 0 && i !== 0) {
			board.push(
				<div key={`row-${rowIndex}`} className="board-row">
					{row}
				</div>
			);
			row = [];
			rowIndex++
		}
		row.push(<Square key={`square-${i}`} value={squares[i]} onSquareClick={() => handleClick(i)} />);
	}

	board.push(
		<div key={`row-${rowIndex}`} className="board-row">
			{row}
		</div>
	)

	return <>
		<div className="status">{status}</div>
		{board}
	</>
}

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
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}