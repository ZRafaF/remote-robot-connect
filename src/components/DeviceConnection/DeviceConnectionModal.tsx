// Copyright (c) 2023 rafae
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, { FC, useCallback } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	Modal,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Button,
	View,
} from "react-native";
import { Device } from "react-native-ble-plx";
import DeviceListItem from "./DeviceListItem/DeviceListItem";

interface DeviceModalProps {
	devices: Device[];
	visible: boolean;
	connectToPeripheral: (device: Device) => void;
	closeModal: () => void;
}

const DeviceModal: FC<DeviceModalProps> = (props) => {
	const { devices, visible, connectToPeripheral, closeModal } = props;

	const renderDeviceModalListItem = useCallback(
		(item: ListRenderItemInfo<Device>) => {
			return (
				<DeviceListItem
					item={item}
					connectToPeripheral={connectToPeripheral}
					closeModal={closeModal}
				/>
			);
		},
		[closeModal, connectToPeripheral]
	);

	return (
		<Modal animationType="slide" transparent={false} visible={visible}>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "#1E1E1E",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						padding: 13,
						backgroundColor: "#252526",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							flex: 1,
							fontSize: 20,
							fontWeight: "bold",
							textAlign: "center",

							color: "white",
						}}
					>
						Selecione um dispositivo
					</Text>
					<TouchableOpacity
						onPress={closeModal}
						style={{
							flex: 1,
							maxWidth: 150,

							backgroundColor: "#007ACC",
							justifyContent: "center",
							alignItems: "center",
							height: 50,
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
							FECHAR
						</Text>
					</TouchableOpacity>
				</View>

				<FlatList
					contentContainerStyle={{
						flex: 1,
						justifyContent: "center",
					}}
					data={devices}
					renderItem={renderDeviceModalListItem}
				/>
			</SafeAreaView>
		</Modal>
	);
};

export default DeviceModal;
