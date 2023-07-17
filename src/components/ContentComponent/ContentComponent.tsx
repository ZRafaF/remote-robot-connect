// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import ExtraComponent from "./ExtraComponent/ExtraComponent";
import PidComponent from "./PidComponent/PidComponent";
import useSubscribe from "../../hooks/useSubscribe";
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

interface ContentComponentProps {
	device: Device | null;
	password: string;
}

const ContentComponent: FunctionComponent<ContentComponentProps> = ({
	device,
	password,
}) => {
	const [pValue] = useSubscribe(P_GET_CHARACTERISTIC, device);
	const [iValue] = useSubscribe(I_GET_CHARACTERISTIC, device);
	const [dValue] = useSubscribe(D_GET_CHARACTERISTIC, device);
	const [extraValue] = useSubscribe(EXTRA_GET_CHARACTERISTIC, device);

	const [sendP] = useSend(P_SET_CHARACTERISTIC, device, password);
	const [sendI] = useSend(I_SET_CHARACTERISTIC, device, password);
	const [sendD] = useSend(D_SET_CHARACTERISTIC, device, password);
	const [sendExtra] = useSend(EXTRA_SET_CHARACTERISTIC, device, password);

	return (
		<View
			pointerEvents={device ? "auto" : "none"}
			style={{
				opacity: device ? 1 : 0.2,
				padding: 20,
			}}
		>
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
