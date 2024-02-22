import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const [activePlayer, setActivePlayer] = useState('X');

	function handleSquareClick(rowIndex, colIndex) {
		setActivePlayer((prevActivePlayer) =>
			prevActivePlayer === 'X' ? 'O' : 'X'
		);

		// Avoid accessing a different state variable in a state updater function. Try to compute it instead
		// In this example we avoid adccessing activePlayer and compute it instead
		setGameTurns((prevGameTurns) => {
			let currentPlayer = 'X';
			if (prevGameTurns.length > 0 && prevGameTurns[0].player === 'X') {
				currentPlayer = 'O';
			}

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
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={activePlayer === 'O'}
					/>
				</ol>
				<GameBoard
					onSquareClick={handleSquareClick}
					turns={gameTurns}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
