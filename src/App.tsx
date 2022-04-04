import { FC, useState, useEffect } from 'react';
import Die from './components/Die';
import Confetti from 'react-confetti';
import soundEffect from './sound/clapping.mp3';

const App: FC = () => {
	const allNewDice = () => {
		const allDice = [];
		for (let i = 0; i < 10; i++) {
			allDice.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: i,
			});
		}
		return allDice;
	};

	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const { value } = dice[0];
		const allHeld = dice.every(die => die.isHeld);
		const allSameValue = dice.every(die => die.value === value);
		if (allHeld && allSameValue) {
			setTenzies(true);
			console.log('You won');
		}
	}, [dice]);

	const rollDice = () => {
		setDice(prevDice =>
			prevDice.map(die =>
				die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
			)
		);
	};

	const holdDice = (id: number) => {
		setDice(prevDice =>
			prevDice.map(die =>
				die.id === id ? { ...die, isHeld: !die.isHeld } : die
			)
		);
	};

	const newGame = () => {
		setTenzies(false);
		setDice(allNewDice());
		console.clear();
	};

	return (
		<main>
			{tenzies && (
				<audio autoPlay>
					<source src={soundEffect} type='audio/mp3' />
				</audio>
			)}
			{tenzies && <Confetti id='confetti' />}
			<h1>Tenzies is great</h1>
			<p>
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<section>
				{dice.map(die => (
					<Die
						value={die.value}
						key={die.id}
						isHeld={die.isHeld}
						holdDice={() => holdDice(die.id)}
					/>
				))}
			</section>

			<button id='roll-btn' onClick={tenzies ? newGame : rollDice}>
				{!tenzies ? 'Roll' : 'New Game'}
			</button>
		</main>
	);
};

export default App;
