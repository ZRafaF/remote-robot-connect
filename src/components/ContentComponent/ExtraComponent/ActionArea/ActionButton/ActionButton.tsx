// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
	sendAction: (data: string) => void;
	action: number;
}

const ActionButton: FunctionComponent<ActionButtonProps> = ({
	sendAction,
	action,
}) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: "white",
				justifyContent: "center",
				alignSelf: "stretch",
				alignItems: "center",
				height: 50,
				marginBottom: 10,
				marginHorizontal: 40,
				borderRadius: 8,
				paddingHorizontal: 10,
			}}
			onPress={() => sendAction(action.toString())}
		>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
				}}
			>
				Executar ação {action}
			</Text>
		</TouchableOpacity>
	);
};

export default ActionButton;
