import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const currentPlayer = deriveActivePlayer(gameTurns);

	let gameBoard = initialGameBoard;

	// gameBoard is updated in a mutable way because we are not using the state setter function
	for (const turn of gameTurns) {
		const { row, col } = turn.square;
		gameBoard[row][col] = turn.player;
	}

	let winner = null;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];
		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = firstSquareSymbol;
		}
	}

	console.log(gameTurns);

	function handleSquareClick(rowIndex, colIndex) {
		setGameTurns((prevGameTurns) => {
			const currentPlayer = deriveActivePlayer(prevGameTurns);

			return [
				{
					square: { row: rowIndex, col: colIndex },
					player: currentPlayer,
				},
				...prevGameTurns,
			];
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
						isActive={currentPlayer === 'X'}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={currentPlayer === 'O'}
					/>
				</ol>
				{winner && <p>You won, {winner}!</p>}
				<GameBoard
					onSquareClick={handleSquareClick}
					gameBoard={gameBoard}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
