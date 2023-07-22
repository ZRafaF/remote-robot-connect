// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";
import { View } from "react-native";
import ActionAdderAndRemover from "./ActionAdderAndRemover/ActionAdderAndRemover";
import ActionButton from "./ActionButton/ActionButton";

interface ActionAreaProps {
	sendAction: (data: string) => void;
	numOfFunc: number;
}

const ActionArea: FunctionComponent<ActionAreaProps> = ({
	sendAction,
	numOfFunc,
}) => {
	const makeActionButtons = () => {
		return [...Array(numOfFunc)].map((element, idx) => (
			<ActionButton
				action={idx}
				sendAction={sendAction}
				key={"action-button" + idx}
			/>
		));
	};

	return (
		<View
			style={{
				alignSelf: "stretch",
				padding: 13,
				gap: 10,
				marginVertical: 5,
				backgroundColor: "#252526",
				justifyContent: "space-around",
				alignItems: "center",
				borderRadius: 8,
			}}
		>
			{makeActionButtons()}
		</View>
	);
};

export default ActionArea;
