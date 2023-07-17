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
				gap: 10,
				padding: 13,
				borderWidth: 3,
				borderColor: "#252526",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View
				style={{
					alignSelf: "stretch",

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
						padding: 13,
						justifyContent: "space-around",
						alignItems: "center",
						borderRadius: 8,
					}}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",

							color: "red",
						}}
					>
						P: 0.2
					</Text>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",

							color: "green",
						}}
					>
						I: 0.2
					</Text>
					<Text
						style={{
							fontSize: 20,
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
