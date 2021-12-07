import { DeviceBean } from 'device';
import { NativeModules, Platform } from 'react-native';
import { DeviceDetailResponse } from './home';

const tuya = NativeModules.TuyaActivatorModule;
const tuyaBLE = NativeModules.TuyaBLEActivatorModule;

export function openNetworkSettings() {
  return tuya.openNetworkSettings({});
}

export type InitActivatorParams = {
  homeId: number;
  ssid: string;
  password: string;
  time: number;
  type: 'TY_EZ' | 'TY_AP' | 'TY_QR';
};

export type InitBluetoothActivatorParams = {
  homeId: number;
  ssid: string;
  password: string;
};

export function initActivator(
  params: InitActivatorParams
): Promise<DeviceDetailResponse> {
  return tuya.initActivator(params);
}

export function stopConfig() {
  return tuya.stopConfig();
}

export function startBluetoothScan() {
  if (Platform.OS === 'ios') {
    return tuyaBLE.startBluetoothScan();
  }
  return tuya.startBluetoothScan();
}

export function initBluetoothDualModeActivator(
  params: InitBluetoothActivatorParams
): Promise<DeviceBean> {
  if (Platform.OS === 'ios') {
    return tuyaBLE.initBluetoothDualModeActivator();
  }
  return tuya.initBluetoothDualModeActivator(params);
}

export function getCurrentWifi(
  success: (ssid: string) => void,
  error: () => void
) {
  // We need the Allow While Using App location permission to use this.
  return tuya.getCurrentWifi({}, success, error);
}
