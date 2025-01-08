import { NativeModules } from 'react-native'
import { addEvent, bridge, DEVLISTENER } from './bridgeUtils'

const tuya = NativeModules.TuyaDeviceModule;

export enum DeviceListenerType {
  onDpUpdate = 'onDpUpdate',
  onRemoved = 'onRemoved',
  onStatusChanged = 'onStatusChanged',
  onNetworkStatusChanged = 'onNetworkStatusChanged',
  onDevInfoUpdate = 'onDevInfoUpdate',
  onFirmwareUpgradeSuccess = 'onFirmwareUpgradeSuccess',
  onFirmwareUpgradeFailure = 'onFirmwareUpgradeFailure',
  onFirmwareUpgradeProgress = 'onFirmwareUpgradeProgress',
  onFirmwareUpgradeStatus = 'onFirmwareUpgradeStatus',
}

const subscriptions: Record<string, number> = {};

type TDeviceListenerOptions = {
  devId: string;
  type: DeviceListenerType;
}
export const addDeviceListener = ({ devId, type}: TDeviceListenerOptions, cb: (data: unknown) => void, onError?: (e: unknown) => void) => {
  if (!subscriptions[devId]) {
    tuya.registerDevListener({ devId }).catch((e: unknown) => onError?.(e));
    subscriptions[devId] = 0;
  }
  const sub = addEvent(bridge(DEVLISTENER, devId), data => {
    if (data.type === type) {
      cb(data);
    }
  });
  subscriptions[devId]++;

  return {
    remove: () => {
      sub.remove();
      if (subscriptions[devId] <= 1) {
        tuya.unRegisterDevListener({ devId });
      }
      subscriptions[devId]--;
    }
  }
};

export const removeAllDeviceListeners = () => {
  Object.keys(subscriptions).forEach((devId) => {
    tuya.unRegisterDevListener({ devId });
    delete subscriptions[devId];
  });
};
