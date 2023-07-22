// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useEffect } from "react";
import { Button, TouchableOpacity, View, Text } from "react-native";
import ExtraComponent from "./ExtraComponent/ExtraComponent";
import PidComponent from "./PidComponent/PidComponent";
import {
	CALLBACK_IDX_SET_CHARACTERISTIC,
	CALLBACK_SIZE_GET_CHARACTERISTIC,
	EXTRA_GET_CHARACTERISTIC,
	EXTRA_SET_CHARACTERISTIC,
	PID_GET_CHARACTERISTIC,
	PID_SET_CHARACTERISTIC,
	PID_SIZE_GET_CHARACTERISTIC,
} from "../../helper/bleHelper";
import { Device } from "react-native-ble-plx";
import useSend from "../../hooks/useSend";
import useSubscribe from "../../hooks/useSubscribe";
import { trigger } from "react-native-haptic-feedback";

interface ContentComponentProps {
	device: Device | null;
	password: string;
}

const ContentComponent: FunctionComponent<ContentComponentProps> = ({
	device,
	password,
}) => {
	const [pidValue, pidUpdate] = useSubscribe(PID_GET_CHARACTERISTIC, device);
	const [numOfPids, numOfPidsUpdate] = useSubscribe(
		PID_SIZE_GET_CHARACTERISTIC,
		device
	);
	const [numOfFunctions, numOfFunctionsUpdate] = useSubscribe(
		CALLBACK_SIZE_GET_CHARACTERISTIC,
		device
	);

	const [extraValue, extraUpdate] = useSubscribe(
		EXTRA_GET_CHARACTERISTIC,
		device
	);

	const [sendPid] = useSend(
		PID_SET_CHARACTERISTIC,
		device,
		password,
		pidUpdate
	);
	const [sendExtra] = useSend(
		EXTRA_SET_CHARACTERISTIC,
		device,
		password,
		extraUpdate
	);

	const [sendAction] = useSend(
		CALLBACK_IDX_SET_CHARACTERISTIC,
		device,
		password,
		pidUpdate
	);

	const updateAll = () => {
		try {
			trigger("impactLight");
		} catch (error) {}
		pidUpdate();
		numOfPidsUpdate();
		numOfFunctionsUpdate();
		extraUpdate();
	};

	const makePidComponents = () => {
		console.log(numOfPids);
		return [...Array(parseInt(numOfPids ? numOfPids : "0"))].map(
			(element, idx) => (
				<PidComponent
					pidValue={pidValue}
					sendPid={sendPid}
					idx={idx}
					key={"pid-component" + idx}
				/>
			)
		);
	};
	return (
		<View
			pointerEvents={device ? "auto" : "none"}
			style={{
				opacity: device ? 1 : 0.2,
				padding: 20,
				overflow: "scroll",
			}}
		>
			<TouchableOpacity
				onPress={updateAll}
				style={{
					marginHorizontal: 50,
					backgroundColor: "#FFDF63",
					justifyContent: "center",
					alignItems: "center",
					height: 50,
					borderRadius: 8,
				}}
			>
				<Text
					style={{
						fontSize: 15,
						fontWeight: "bold",
					}}
				>
					FORÇAR ATUALIZAÇÃO
				</Text>
			</TouchableOpacity>
			{makePidComponents()}
			<ExtraComponent
				extraValue={extraValue}
				numOfFunc={parseInt(numOfFunctions ? numOfFunctions : "0")}
				sendExtra={sendExtra}
				sendAction={sendAction}
			/>
		</View>
	);
};

export default ContentComponent;
