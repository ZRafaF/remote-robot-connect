// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";

import { StyleSheet, Text, View, TextInput } from "react-native";

interface PasswordInputProps {}

const PasswordInput: FunctionComponent<PasswordInputProps> = () => {
	const [number, onChangeNumber] = useState("");

	return (
		<View
			style={{
				flexDirection: "row",
				gap: 10,
				padding: 13,
				backgroundColor: "#252526",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TextInput
				style={{
					flex: 1,
					height: 40,
					maxWidth: 150,
					borderWidth: 1,
					padding: 10,
					color: "white",
					borderColor: "grey",
					borderRadius: 8,
				}}
				placeholderTextColor={"white"}
				onChangeText={onChangeNumber}
				value={number}
				placeholder="Inserir senha"
				keyboardType="numeric"
			/>

			<Text
				style={{
					flex: 1,

					fontSize: 20,
					fontWeight: "bold",

					color: "white",
				}}
			>
				SENHA: {number}
			</Text>
		</View>
	);
};

export default PasswordInput;
