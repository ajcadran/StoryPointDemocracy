import React, { useContext, useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import { AppContext } from "./App";

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

	// @ts-ignore
	const { state } = useContext(AppContext);
	const { room, userCards } = state;

	const [labels, setLabels] = useState<String[]>();
	const [data, setData] = useState<Number[]>();

	useEffect(() => {
		let temp_labels = [] as String[];
		let temp_data = [] as Number[];
		for (const cardID in room.cards) {
			let num = 0;
			for (const userID in userCards) {
				if (room.cards[cardID].id === userCards[userID])
					++num;
			}
			if (num > 0) {
				temp_labels.push(room.cards[cardID].value);
				temp_data.push(num);
			}
		}
		setLabels(temp_labels);
		setData(temp_data);
	}, [room.cards, userCards]);

	return (
		<CChart type="pie" style={{ width: '150%' }} data={{
			labels: labels,
			datasets: [{
				label: 'Voting Results',
				data: data,
				backgroundColor: colors,
				hoverOffset: 4
			}]
		}} />
	);
}
export default ResultsDisplay;
