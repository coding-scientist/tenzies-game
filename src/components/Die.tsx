import { FC } from 'react';

interface PropsInterface {
	value: number;
	isHeld: boolean;
	holdDice(): void;
}

const Die: FC<PropsInterface> = props => (
	<div
		className={`die ${props.isHeld ? 'held' : ''}`}
		onClick={props.holdDice}
	>
		<p>{props.value}</p>
	</div>
);

export default Die;
