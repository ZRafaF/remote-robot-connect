// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";

import { StyleSheet, Text, View, TextInput } from "react-native";

interface CommunicationAreaProps {}

const CommunicationArea: FunctionComponent<CommunicationAreaProps> = () => {
	const [number, onChangeNumber] = useState("");

	return (
		<View style={styles.passwordView}>
			<Text> SENHA: </Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeNumber}
				value={number}
				placeholder="useless placeholder"
				keyboardType="numeric"
			/>
		</View>
	);
};

export default CommunicationArea;

const styles = StyleSheet.create({
	passwordView: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
