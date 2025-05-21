export default function Square({ value, onSquareClick, isWinner }) {

	return (
		<button
			className={`square ${isWinner ? 'winner-square' : ''}`}
			onClick={onSquareClick}
		>
			{value}
		</button>
	);
}