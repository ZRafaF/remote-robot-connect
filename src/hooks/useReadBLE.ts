// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { useState } from "react";

import { Characteristic, Device } from "react-native-ble-plx";
import { SERVICE_UUID } from "../helper/bleHelper";

import base64 from "react-native-base64";
const useReadBLE = (characteristicUUID: string, device: Device | null) => {
	const [value, setValue] = useState<string>("");

	const update = () => {
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
	};

	return [value, update] as const;
};

export default useReadBLE;
