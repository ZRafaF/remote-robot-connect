// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { Text, View } from "react-native";
import ExtraComponent from "./ExtraComponent/ExtraComponent";
import PidComponent from "./PidComponent/PidComponent";

interface ContentComponentProps {
	enabled: boolean;
}

const ContentComponent: FunctionComponent<ContentComponentProps> = ({
	enabled,
}) => {
	return (
		<View
			pointerEvents={enabled ? "auto" : "none"}
			style={{
				opacity: enabled ? 1 : 0.2,
				padding: 20,
				gap: 20,
			}}
		>
			<PidComponent />
			<ExtraComponent />
		</View>
	);
};

export default ContentComponent;
