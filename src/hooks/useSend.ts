// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Device } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { SERVICE_UUID } from "../helper/bleHelper";
import { trigger } from "react-native-haptic-feedback";

const useSend = (
	characteristicUUID: string,
	device: Device | null,
	password: string,
	updateFunc?: () => void
) => {
	const send = (data: string) => {
		if (password.length === 0) {
			alert("Sua senha está vazia, isso está correto?");
		}
		device
			?.writeCharacteristicWithResponseForService(
				SERVICE_UUID,
				characteristicUUID,
				base64.encode(password + data)
			)
			.then(() => {
				if (updateFunc) {
					setTimeout(updateFunc, 200); // 200 ms delay to force update
				}
				try {
					trigger("impactLight");
				} catch (error) {}
			});
	};
	return [send] as const;
};

export default useSend;
