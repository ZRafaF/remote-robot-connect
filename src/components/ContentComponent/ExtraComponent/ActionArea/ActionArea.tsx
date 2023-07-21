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
}

const ActionArea: FunctionComponent<ActionAreaProps> = ({ sendAction }) => {
	const [numOfActions, setNumOfActions] = useState<number>(0);

	const makeActionButtons = () => {
		return [...Array(numOfActions)].map((element, idx) => (
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
			<ActionAdderAndRemover setNumOfActions={setNumOfActions} />
		</View>
	);
};

export default ActionArea;
