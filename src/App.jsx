import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
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
	const [players, setPlayers] = useState({
		X: 'Player 1',
		O: 'Player 2',
	});
	const [gameTurns, setGameTurns] = useState([]);
	const currentPlayer = deriveActivePlayer(gameTurns);

	// gameBoard is a copy of the initialGameBoard so we can keep initalGameBoard immutable
	let gameBoard = [...initialGameBoard.map((row) => [...row])];

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
			winner = players[firstSquareSymbol];
		}
	}

	const hasDraw = gameTurns.length === 9 && !winner;

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

	function handleRematchClick() {
		setGameTurns([]);
	}

	function handlePlayerNameChange(symbol, newName) {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
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
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={currentPlayer === 'O'}
						onChangeName={handlePlayerNameChange}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver winner={winner} rematch={handleRematchClick} />
				)}
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
