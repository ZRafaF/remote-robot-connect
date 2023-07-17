// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

import { Text, View } from "react-native";
import CardComponent from "./CardComponent";

interface PidComponentProps {}

const PidComponent: FunctionComponent<PidComponentProps> = () => {
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
						P: 0.2
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "bold",
							color: "green",
						}}
					>
						I: 0.2
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "bold",
							color: "blue",
						}}
					>
						D: 0.2
					</Text>
				</View>
			</View>

			<CardComponent
				cardCallBack={() => {}}
				cardTitle="P"
				defaultColor="red"
			/>
			<CardComponent
				cardCallBack={() => {}}
				cardTitle="I"
				defaultColor="green"
			/>
			<CardComponent
				cardCallBack={() => {}}
				cardTitle="D"
				defaultColor="blue"
			/>
		</View>
	);
};

export default PidComponent;
