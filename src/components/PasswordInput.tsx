// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { Text, View, TextInput } from "react-native";

interface PasswordInputProps {
	passwordString: string;
	setPasswordString: Dispatch<SetStateAction<string>>;
}

const PasswordInput: FunctionComponent<PasswordInputProps> = ({
	passwordString,
	setPasswordString,
}) => {
	return (
		<View
			style={{
				flexDirection: "row",
				padding: 13,
				backgroundColor: "#252526",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<TextInput
				style={{
					flex: 1,
					height: 40,
					maxWidth: 150,
					borderWidth: 1,
					marginRight: 30,
					padding: 10,
					color: "white",
					borderColor: "grey",
					borderRadius: 8,
				}}
				placeholderTextColor={"grey"}
				onChangeText={setPasswordString}
				value={passwordString}
				placeholder="Inserir senha"
			/>

			<Text
				style={{
					flex: 1,

					fontSize: 15,
					fontWeight: "bold",

					color: "white",
				}}
			>
				SENHA: {passwordString}
			</Text>
		</View>
	);
};

export default PasswordInput;
