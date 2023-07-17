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

interface BluetoothLowEnergyApi {
	requestPermissions(): Promise<boolean>;
	scanForPeripherals(): void;
	connectToDevice: (deviceId: Device) => Promise<void>;
	disconnectFromDevice: () => void;
	connectedDevice: Device | null;
	allDevices: Device[];
	heartRate: string;
}

function useBLE(): BluetoothLowEnergyApi {
	const bleManager = useMemo(() => new BleManager(), []);
	const [allDevices, setAllDevices] = useState<Device[]>([]);
	const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
	const [heartRate, setHeartRate] = useState<string>("");

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
				setAllDevices((prevState: Device[]) => {
					if (!isDuplicteDevice(prevState, device)) {
						return [...prevState, device];
					}
					return prevState;
				});
			}
		});

	const connectToDevice = async (device: Device) => {
		try {
			const deviceConnection = await bleManager.connectToDevice(
				device.id
			);
			setConnectedDevice(deviceConnection);
			await deviceConnection.discoverAllServicesAndCharacteristics();
			bleManager.stopDeviceScan();
			startStreamingData(deviceConnection);
		} catch (e) {
			console.log("FAILED TO CONNECT", e);
		}
	};

	const disconnectFromDevice = () => {
		if (connectedDevice) {
			bleManager.cancelDeviceConnection(connectedDevice.id);
			setConnectedDevice(null);
			setHeartRate("");
		}
	};

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
		setHeartRate(rawData);
	};

	const startStreamingData = async (device: Device) => {
		if (device) {
			device.monitorCharacteristicForService(
				HEART_RATE_UUID,
				HEART_RATE_CHARACTERISTIC,
				onHeartRateUpdate
			);
		} else {
			console.log("No Device Connected");
		}
	};

	return {
		scanForPeripherals,
		requestPermissions,
		connectToDevice,
		allDevices,
		connectedDevice,
		disconnectFromDevice,
		heartRate,
	};
}

export default useBLE;
