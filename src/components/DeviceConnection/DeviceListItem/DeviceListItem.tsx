// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useCallback } from "react";
import {
	ListRenderItemInfo,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { Device } from "react-native-ble-plx";
import { trigger } from "react-native-haptic-feedback";

interface DeviceListItemProps {
	item: ListRenderItemInfo<Device>;
	connectToPeripheral: (device: Device) => void;
	closeModal: () => void;
}

const DeviceListItem: FunctionComponent<DeviceListItemProps> = (props) => {
	const { item, connectToPeripheral, closeModal } = props;

	const connectAndCloseModal = useCallback(() => {
		trigger("impactLight");

		connectToPeripheral(item.item);
		closeModal();
	}, [closeModal, connectToPeripheral, item.item]);

	return (
		<TouchableOpacity onPress={connectAndCloseModal} style={styles.button}>
			<Text style={styles.text}>{item.item.name}</Text>
		</TouchableOpacity>
	);
};

export default DeviceListItem;

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#007ACC",
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		marginHorizontal: 20,
		marginBottom: 5,
		borderRadius: 8,
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
});
