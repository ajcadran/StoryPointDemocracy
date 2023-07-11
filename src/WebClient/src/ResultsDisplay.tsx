import React, {useContext, useEffect, useState} from "react";
import {CChart} from "@coreui/react-chartjs";
import {AppContext} from "./App";

const colors = [
	'rgb(169, 188, 255)',
	'rgb(154, 255, 255)',
	'rgb(24, 255, 177)',
	'rgb(255, 255, 173)',
	'rgb(255, 212, 147)',
	'rgb(255, 159, 140)',
	'rgb(255, 189, 218)',
]

const ResultsDisplay = () => {

	const {state, dispatch} = useContext(AppContext);
	const {cards, userCards} = state;

	const [labels, setLabels] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		let temp_labels = [];
		let temp_data = [];
		for (const cardID in cards) {
			let num = 0;
			for (const userID in userCards) {
				if (cards[cardID].id === userCards[userID])
					++num;
			}
			if (num > 0) {
				temp_labels.push(cards[cardID].value);
				temp_data.push(num);
			}
		}
		setLabels(temp_labels);
		setData(temp_data);
	}, [cards, userCards]);

	return (
		<CChart type="pie" data={{
			labels: labels,
			datasets: [{
				label: 'Voting Results',
				data: data,
				backgroundColor: colors,
				hoverOffset: 4
			}]
		}}/>
	);
}
export default ResultsDisplay;
