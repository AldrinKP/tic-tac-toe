const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard({ onSquareClick, turns }) {
	let gameBoard = initialGameBoard;

	// gameBoard is updated in a mutable way because we are not using the state setter function
	for (const turn of turns) {
		const { row, col } = turn.square;
		gameBoard[row][col] = turn.player;
	}

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
									disabled={playerSymbol !== null}
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
