// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";
import {
	TextInput,
	View,
	Text,
	Button,
	ColorValue,
	Keyboard,
} from "react-native";

interface CardComponentProps {
	cardTitle: string;
	cardCallBack: (value: string) => void;
}

const CardComponent: FunctionComponent<CardComponentProps> = ({
	cardTitle,
	cardCallBack,
}) => {
	const [number, onChangeNumber] = useState("");

	const triggerCallBack = () => {
		cardCallBack(number);
		Keyboard.dismiss();
	};
	return (
		<View
			style={{
				alignSelf: "stretch",
				flexDirection: "row",
				padding: 13,
				marginVertical: 5,
				backgroundColor: "#252526",
				justifyContent: "space-around",
				alignItems: "center",
				borderRadius: 8,
			}}
		>
			<TextInput
				style={{
					flex: 1,
					height: 40,
					borderWidth: 1,
					marginRight: 30,
					padding: 10,
					color: "white",
					borderColor: "grey",
					borderRadius: 8,
				}}
				onSubmitEditing={triggerCallBack}
				placeholderTextColor={"grey"}
				onChangeText={onChangeNumber}
				value={number}
				placeholder="Novo valor"
			/>
			<Button title="ENVIAR" color="#3E3E42" onPress={triggerCallBack} />
		</View>
	);
};

export default CardComponent;
