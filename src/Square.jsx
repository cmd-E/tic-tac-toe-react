import styles from './styles/square.module.css'

export default function Square({ value, onSquareClick, isWinner }) {

	return (
		<button
			className={`${styles.square} ${isWinner ? styles.winnerSquare : ''}`}
			onClick={onSquareClick}
		>
			{value}
		</button>
	);
}