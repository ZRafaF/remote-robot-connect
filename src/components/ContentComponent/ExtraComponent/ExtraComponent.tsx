// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

import { Text, View } from "react-native";
import CardComponent from "./CardComponent";

interface ExtraComponentProps {}

const ExtraComponent: FunctionComponent<ExtraComponentProps> = () => {
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
					EXTRA
				</Text>
			</View>

			<CardComponent
				cardCallBack={() => {}}
				cardTitle="EXTRA"
				defaultColor="#BCD8C1"
			/>
		</View>
	);
};

export default ExtraComponent;
