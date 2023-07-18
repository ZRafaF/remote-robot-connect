// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { Button, TouchableOpacity, View, Text } from "react-native";
import ExtraComponent from "./ExtraComponent/ExtraComponent";
import PidComponent from "./PidComponent/PidComponent";
import {
	D_GET_CHARACTERISTIC,
	D_SET_CHARACTERISTIC,
	EXTRA_GET_CHARACTERISTIC,
	EXTRA_SET_CHARACTERISTIC,
	I_GET_CHARACTERISTIC,
	I_SET_CHARACTERISTIC,
	P_GET_CHARACTERISTIC,
	P_SET_CHARACTERISTIC,
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
	const [pValue, pUpdate] = useSubscribe(P_GET_CHARACTERISTIC, device);
	const [iValue, iUpdate] = useSubscribe(I_GET_CHARACTERISTIC, device);
	const [dValue, dUpdate] = useSubscribe(D_GET_CHARACTERISTIC, device);
	const [extraValue, extraUpdate] = useSubscribe(
		EXTRA_GET_CHARACTERISTIC,
		device
	);

	const [sendP] = useSend(P_SET_CHARACTERISTIC, device, password, pUpdate);
	const [sendI] = useSend(I_SET_CHARACTERISTIC, device, password, iUpdate);
	const [sendD] = useSend(D_SET_CHARACTERISTIC, device, password, dUpdate);
	const [sendExtra] = useSend(
		EXTRA_SET_CHARACTERISTIC,
		device,
		password,
		extraUpdate
	);

	const updateAll = () => {
		trigger("impactLight");

		pUpdate();
		iUpdate();
		dUpdate();
		extraUpdate();
	};

	return (
		<View
			pointerEvents={device ? "auto" : "none"}
			style={{
				opacity: device ? 1 : 0.2,
				padding: 20,
				justifyContent: "center",
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

			<PidComponent
				pValue={pValue}
				iValue={iValue}
				dValue={dValue}
				sendP={sendP}
				sendI={sendI}
				sendD={sendD}
			/>
			<ExtraComponent extraValue={extraValue} sendExtra={sendExtra} />
		</View>
	);
};

export default ContentComponent;
