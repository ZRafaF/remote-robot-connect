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
	EXTRA_GET_CHARACTERISTIC,
	I_GET_CHARACTERISTIC,
	P_GET_CHARACTERISTIC,
} from "../../helper/bleHelper";

interface ContentComponentProps {
	enabled: boolean;
}

const ContentComponent: FunctionComponent<ContentComponentProps> = ({
	enabled,
}) => {
	const [pValue, pSubscribe] = useSubscribe(P_GET_CHARACTERISTIC);
	const [iValue, iSubscribe] = useSubscribe(I_GET_CHARACTERISTIC);
	const [dValue, dSubscribe] = useSubscribe(D_GET_CHARACTERISTIC);
	const [extraValue, extraSubscribe] = useSubscribe(EXTRA_GET_CHARACTERISTIC);
	return (
		<View
			pointerEvents={enabled ? "auto" : "none"}
			style={{
				opacity: enabled ? 1 : 0.2,
				padding: 20,
			}}
		>
			<PidComponent />
			<ExtraComponent />
		</View>
	);
};

export default ContentComponent;
