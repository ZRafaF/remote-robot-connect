// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface ActionAdderAndRemoverProps {
	setNumOfActions: Dispatch<SetStateAction<number>>;
}

const ActionAdderAndRemover: FunctionComponent<ActionAdderAndRemoverProps> = ({
	setNumOfActions,
}) => {
	const incrementActions = () => {
		setNumOfActions((prevCount) => prevCount + 1);
	};

	const decrementActions = () => {
		setNumOfActions((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
	};

	return (
		<View
			style={{
				alignSelf: "stretch",
				flexDirection: "row",
				marginVertical: 5,
				justifyContent: "space-around",
				alignItems: "center",
				borderRadius: 8,
			}}
		>
			<TouchableOpacity
				style={{
					borderColor: "#66BB6A",
					backgroundColor: "#264426",
					borderWidth: 2,
					justifyContent: "center",
					alignSelf: "stretch",
					alignItems: "center",
					height: 50,
					borderRadius: 8,
					paddingHorizontal: 10,
				}}
				onPress={incrementActions}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						color: "#66BB6A",
					}}
				>
					ADD. Ação
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					borderColor: "#F44336",
					backgroundColor: "#422525",
					borderWidth: 2,
					justifyContent: "center",
					alignSelf: "stretch",
					alignItems: "center",
					height: 50,
					borderRadius: 8,
					paddingHorizontal: 10,
				}}
				onPress={decrementActions}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						color: "#F44336",
					}}
				>
					REM. Ação
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ActionAdderAndRemover;
