import {CChart} from "@coreui/react-chartjs";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "./App";

const colors = [
	'rgb(33, 150, 243)',
	'rgb(233, 30, 99)',
	'rgb(76, 175, 80)',
	'rgb(156, 39, 176)',
	'rgb(244, 67, 54)',
	'rgb(0, 188, 212)'
]

const ResultsDisplay = () => {

	const {state, dispatch} = useContext(AppContext);
	const {cards, userCards} = state;

	const [labels, setLabels] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		let labels = [];
		let data = [];
		for (const cardID in cards) {
			let num = 0;
			for (const userID in userCards) {
				if (cards[cardID].id === userCards[userID])
					++num;
			}
			if (num > 0) {
				labels.push(cards[cardID].value);
				data.push(num);
			}
		}
		setLabels(labels);
		setData(data);
	}, [cards, userCards]);

	const generateColors = () => {
		if (!labels) return [];
		return labels.map((label) => colors[label]);
	}

	return (
		<CChart type="pie" data={{
			labels: labels,
			datasets: [{
				label: 'Voting Results',
				data: data,
				backgroundColor: generateColors(),
				hoverOffset: 4
			}]
		}}/>
	);
}
export default ResultsDisplay;
