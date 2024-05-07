import { useState } from 'react';

export default function Player({
	initialName,
	symbol,
	isActive,
	onChangeName,
}) {
	const [isEditing, setisEditing] = useState(false);
	const [newName, setNewName] = useState(initialName);

	function handleClick() {
		setisEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, newName);
		}
	}

	function handleInputChange(event) {
		setNewName(event.target.value);
	}

	let playerName = <span className="player-name">{newName}</span>;
	let buttonText = 'Edit';

	if (isEditing) {
		playerName = (
			<input
				type="text"
				required
				value={newName}
				onChange={handleInputChange}
			/>
		);
		buttonText = 'Save';
	}

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className="player">
				{playerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleClick}>{buttonText}</button>
		</li>
	);
}
