import { useState } from 'react';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard({ onSquareClick }) {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);

	function handleSquarelick(rowIndex, colIndex) {
		setGameBoard((prevGameBoard) => {
			const newGameBoard = [...prevGameBoard.map((row) => [...row])];
			newGameBoard[rowIndex][colIndex] = 'X';
			return newGameBoard;
		});

		onSquareClick();
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
										handleSquarelick(rowIndex, colIndex)
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
