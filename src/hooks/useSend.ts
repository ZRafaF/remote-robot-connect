// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Device } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { SERVICE_UUID } from "../helper/bleHelper";

const useSend = (
	characteristicUUID: string,
	device: Device | null,
	password: string
) => {
	const send = (data: string) => {
		device?.writeCharacteristicWithResponseForService(
			SERVICE_UUID,
			characteristicUUID,
			base64.encode(password + data)
		);
	};
	return [send] as const;
};

export default useSend;
