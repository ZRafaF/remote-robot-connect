import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import DeviceModal from "./src/components/DeviceConnection/DeviceConnectionModal";
import useBLE from "./src/hooks/useBle";
import PasswordInput from "./src/components/PasswordInput";
import ContentComponent from "./src/components/ContentComponent/ContentComponent";

const App = () => {
	const [
		requestPermissions,
		scanForPeripherals,
		allDevices,
		connectToDevice,
		disconnectFromDevice,
		connectedDevice,
	] = useBLE();
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const [password, setPassword] = useState<string>("");

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
		scanForPeripherals();
		setIsModalVisible(true);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#1E1E1E",
			}}
		>
			<PasswordInput
				passwordString={password}
				setPasswordString={setPassword}
			/>
			<ContentComponent device={connectedDevice} password={password} />
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			></View>
			<TouchableOpacity
				onPress={connectedDevice ? disconnectFromDevice : openModal}
				style={{
					backgroundColor: "#007ACC",
					justifyContent: "center",
					alignItems: "center",
					height: 50,
					marginHorizontal: 40,
					marginVertical: 10,
					borderRadius: 8,
				}}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						color: "white",
					}}
				>
					{connectedDevice ? "Disconnect" : "Connect"}
				</Text>
			</TouchableOpacity>
			<DeviceModal
				closeModal={hideModal}
				visible={isModalVisible}
				connectToDevice={connectToDevice}
				devices={allDevices}
			/>
		</SafeAreaView>
	);
};

export default App;
