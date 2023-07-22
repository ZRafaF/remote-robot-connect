// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useMemo, useState } from "react";

import { Text, TextInput, View, Button } from "react-native";

interface PidComponentProps {
	pidValue: string;
	sendPid: (data: string) => void;
	idx: number;
}

const PidComponent: FunctionComponent<PidComponentProps> = ({
	pidValue,
	sendPid,
	idx,
}) => {
	const [pValue, setPValue] = useState<string>("");
	const [iValue, setIValue] = useState<string>("");
	const [dValue, setDValue] = useState<string>("");

	const pidParsed: PidResponse | undefined = useMemo(() => {
		try {
			return JSON.parse(pidValue);
		} catch (error) {}
	}, [pidValue]);

	const serializeAndSend = () => {
		if (pidParsed === undefined) {
			alert("Não foi possível enviar a mensagem");
			return;
		}
		let sendObject: PidResponse = {
			pid: [...pidParsed.pid],
		};

		try {
			if (pValue) {
				sendObject.pid[idx][0] = parseFloat(pValue);
			}
			if (iValue) {
				sendObject.pid[idx][1] = parseFloat(pValue);
			}
			if (dValue) {
				sendObject.pid[idx][2] = parseFloat(pValue);
			}

			sendPid('{"pid": [[1,1,1],[1,1,1]]}');
			console.log(sendObject);
		} catch (error) {
			console.error(error);
			alert("something went wrong");
		}
	};

	return (
		<View
			style={{
				borderRadius: 12,
				padding: 13,
				borderWidth: 1.5,
				borderColor: "#2D2D30",
				justifyContent: "center",
				alignItems: "center",
				marginVertical: 10,
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
					PID {idx}
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
							fontSize: 15,
							fontWeight: "bold",
							color: "red",
						}}
					>
						P: {}
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "bold",
							color: "green",
						}}
					>
						I: {}
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "bold",
							color: "blue",
						}}
					>
						D: {}
					</Text>
				</View>
			</View>
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
				<Text
					style={{
						fontSize: 20,
						width: 30,
						fontWeight: "bold",

						color: "red",
					}}
				>
					P
				</Text>
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
					onSubmitEditing={() => {}}
					placeholderTextColor={"grey"}
					onChangeText={setPValue}
					value={pValue}
					placeholder="Novo valor"
					keyboardType="numeric"
				/>
			</View>
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
				<Text
					style={{
						fontSize: 20,
						width: 30,
						fontWeight: "bold",

						color: "green",
					}}
				>
					I
				</Text>
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
					onSubmitEditing={() => {}}
					placeholderTextColor={"grey"}
					onChangeText={setIValue}
					value={iValue}
					placeholder="Novo valor"
					keyboardType="numeric"
				/>
			</View>
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
				<Text
					style={{
						fontSize: 20,
						width: 30,
						fontWeight: "bold",

						color: "blue",
					}}
				>
					D
				</Text>
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
					onSubmitEditing={() => {}}
					placeholderTextColor={"grey"}
					onChangeText={setDValue}
					value={dValue}
					placeholder="Novo valor"
					keyboardType="numeric"
				/>
			</View>
			<Button title="ENVIAR" onPress={serializeAndSend} />
		</View>
	);
};

export default PidComponent;
