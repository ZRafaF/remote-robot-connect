/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
	BleError,
	BleManager,
	Characteristic,
	Device,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";

const HEART_RATE_UUID = "3e60a07c-235e-11ee-be56-0242ac120002";
const HEART_RATE_CHARACTERISTIC = "6bf30bea-2392-11ee-be56-0242ac120002";

const useBLE = () => {
	const bleManager = useMemo(() => new BleManager(), []);
	const [allDevices, setAllDevices] = useState<Device[]>([]);
	const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

	const requestAndroid31Permissions = async () => {
		const bluetoothScanPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
			{
				title: "Location Permission",
				message: "Bluetooth Low Energy requires Location",
				buttonPositive: "OK",
			}
		);
		const bluetoothConnectPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
			{
				title: "Location Permission",
				message: "Bluetooth Low Energy requires Location",
				buttonPositive: "OK",
			}
		);
		const fineLocationPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: "Location Permission",
				message: "Bluetooth Low Energy requires Location",
				buttonPositive: "OK",
			}
		);

		return (
			bluetoothScanPermission === "granted" &&
			bluetoothConnectPermission === "granted" &&
			fineLocationPermission === "granted"
		);
	};

	const requestPermissions = async () => {
		if (Platform.OS === "android") {
			if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: "Location Permission",
						message: "Bluetooth Low Energy requires Location",
						buttonPositive: "OK",
					}
				);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} else {
				const isAndroid31PermissionsGranted =
					await requestAndroid31Permissions();

				return isAndroid31PermissionsGranted;
			}
		} else {
			return true;
		}
	};

	const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
		devices.findIndex((device) => nextDevice.id === device.id) > -1;

	const scanForPeripherals = () =>
		bleManager.startDeviceScan([HEART_RATE_UUID], null, (error, device) => {
			if (error) {
				console.log(error);
			}
			if (device) {
				console.log("here");
				setAllDevices((prevState: Device[]) => {
					if (!isDuplicteDevice(prevState, device)) {
						return [...prevState, device];
					}
					return prevState;
				});
			}
		});

	const connectToDevice = async (device: Device) => {
		bleManager
			.connectToDevice(device.id)
			.then((deviceConnection) => {
				deviceConnection
					.discoverAllServicesAndCharacteristics()
					.then((discDev) => {
						setConnectedDevice(discDev);
					})
					.then(() => {
						bleManager.stopDeviceScan();
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((error) => {
				console.error("FAILED TO CONNECT", error);
			});
	};

	const disconnectFromDevice = () => {
		if (connectedDevice) {
			bleManager.cancelDeviceConnection(connectedDevice.id);
			setConnectedDevice(null);
		}
	};

	return [
		requestPermissions,
		scanForPeripherals,
		allDevices,
		connectToDevice,
		disconnectFromDevice,
		connectedDevice,
	] as const;
};

export default useBLE;
