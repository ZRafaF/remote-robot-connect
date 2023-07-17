// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useEffect, useState } from "react";

import { BleError, Characteristic, Device } from "react-native-ble-plx";
import { SERVICE_UUID } from "../helper/bleHelper";

import base64 from "react-native-base64";
const useSubscribe = (characteristicUUID: string, device: Device | null) => {
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

		console.log(characteristic.value);

		const rawData = base64.decode(characteristic.value);

		setValue(rawData);
	};

	useEffect(() => {
		console.log(device);
		const subscribe = async () => {
			device
				?.readCharacteristicForService(SERVICE_UUID, characteristicUUID)
				.then((characteristic: Characteristic | null) => {
					if (!characteristic?.value) {
						console.log("No Data was recieved");
						return;
					}
					const rawData = base64.decode(characteristic.value);

					setValue(rawData);
				});

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
		if (device) subscribe();
	}, [device]);

	return [value] as const;
};

export default useSubscribe;
