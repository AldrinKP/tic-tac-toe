const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard({ onSquareClick, turns }) {
	let gameBoard = initialGameBoard;

	for (const turn of turns) {
		const { row, col } = turn.square;
		gameBoard[row][col] = turn.player;
	}
	// const [gameBoard, setGameBoard] = useState(initialGameBoard);

	// function handleSquarelick(rowIndex, colIndex) {
	// 	setGameBoard((prevGameBoard) => {
	// 		const newGameBoard = [...prevGameBoard.map((row) => [...row])];
	// 		newGameBoard[rowIndex][colIndex] = playerSymbol;
	// 		return newGameBoard;
	// 	});

	// 	onSquareClick();
	// }

	return (
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() =>
										onSquareClick(rowIndex, colIndex)
									}
								>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
