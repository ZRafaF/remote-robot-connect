// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

import { Text, View } from "react-native";
import CardComponent from "../CardComponent";

interface PidComponentProps {
	pValue: string;
	iValue: string;
	dValue: string;

	sendP: (data: string) => void;
	sendI: (data: string) => void;
	sendD: (data: string) => void;
}

const PidComponent: FunctionComponent<PidComponentProps> = ({
	pValue,
	iValue,
	dValue,
	sendP,
	sendI,
	sendD,
}) => {
	return (
		<View
			style={{
				borderRadius: 12,
				padding: 13,
				borderWidth: 1.5,
				borderColor: "#2D2D30",
				justifyContent: "center",
				alignItems: "center",
				marginVertical: 10,
			}}
		>
			<View
				style={{
					alignSelf: "stretch",
					paddingVertical: 5,
					justifyContent: "space-around",
					alignItems: "center",
					borderRadius: 8,
				}}
			>
				<Text
					style={{
						fontSize: 30,
						fontWeight: "bold",

						color: "white",
					}}
				>
					PID
				</Text>
				<View
					style={{
						alignSelf: "stretch",

						flexDirection: "row",
						gap: 10,
						justifyContent: "space-around",
						alignItems: "center",
						borderRadius: 8,
					}}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "bold",
							color: "red",
						}}
					>
						P: {parseFloat(pValue).toFixed(3)}
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "bold",
							color: "green",
						}}
					>
						I: {parseFloat(iValue).toFixed(3)}
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "bold",
							color: "blue",
						}}
					>
						D: {parseFloat(dValue).toFixed(3)}
					</Text>
				</View>
			</View>

			<CardComponent
				cardCallBack={(value: string) => {
					sendP(value);
				}}
				cardTitle="P"
				defaultColor="red"
				buttonColor="red"
			/>
			<CardComponent
				cardCallBack={(value: string) => {
					sendI(value);
				}}
				cardTitle="I"
				defaultColor="green"
				buttonColor="green"
			/>
			<CardComponent
				cardCallBack={(value: string) => {
					sendD(value);
				}}
				cardTitle="D"
				defaultColor="blue"
				buttonColor="blue"
			/>
		</View>
	);
};

export default PidComponent;
