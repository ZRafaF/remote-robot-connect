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
				borderWidth: 1.5,
				marginVertical: 10,
				borderColor: "#2D2D30",
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
						EXTRA
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
								flex: 1,
								fontWeight: "bold",
								color: "white",
								alignSelf: "stretch",
								fontSize: 15,
								textAlign: "left",
							}}
						>
							Recebido:
						</Text>
					</View>
				</View>
			</View>

			<CardComponent cardCallBack={() => {}} cardTitle="EXTRA" />
		</View>
	);
};

export default ExtraComponent;
