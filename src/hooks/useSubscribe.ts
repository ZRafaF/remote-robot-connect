// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useState } from "react";

import { BleError, Characteristic, Device } from "react-native-ble-plx";
import { SERVICE_UUID } from "../helper/bleHelper";

const useSubscribe = (characteristicUUID: string) => {
	const [value, setValue] = useState<string>("");

	const onHeartRateUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			console.log("No Data was recieved");
			return -1;
		}

		const rawData = characteristic.value;
		setValue(rawData);
	};

	const subscribe = async (device: Device) => {
		if (device) {
			device.monitorCharacteristicForService(
				SERVICE_UUID,
				characteristicUUID,
				onHeartRateUpdate
			);
		} else {
			console.log("No Device Connected");
		}
	};

	return [value, subscribe] as const;
};

export default useSubscribe;
