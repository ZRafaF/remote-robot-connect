import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { al } from "./src/helper/blAPI";

import { BleManager } from "react-native-ble-plx";
import { useEffect, useState } from "react";
import useBLE from "./src/hooks/useBle";
import DeviceModal from "./src/components/DeviceConnectionModal";

export const manager = new BleManager();

export default function App() {
	const {
		requestPermissions,
		scanForPeripherals,
		allDevices,
		connectToDevice,
		connectedDevice,
		heartRate,
		disconnectFromDevice,
	} = useBLE();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const scanForDevices = async () => {
		const isPermissionsEnabled = await requestPermissions();
		if (isPermissionsEnabled) {
			scanForPeripherals();
		}
	};

	const hideModal = () => {
		setIsModalVisible(false);
	};

	const openModal = async () => {
		scanForDevices();
		setIsModalVisible(true);
	};

	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />
			<Button title="mes" onPress={scanForDevices} />
			<Button
				title="Toggle Modal"
				onPress={() => {
					setIsModalVisible((old) => !old);
				}}
			/>
			<DeviceModal
				closeModal={hideModal}
				visible={isModalVisible}
				connectToPeripheral={connectToDevice}
				devices={allDevices}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
