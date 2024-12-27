export declare enum DeviceListenerType {
    onDpUpdate = "onDpUpdate",
    onRemoved = "onRemoved",
    onStatusChanged = "onStatusChanged",
    onNetworkStatusChanged = "onNetworkStatusChanged",
    onDevInfoUpdate = "onDevInfoUpdate",
    onFirmwareUpgradeSuccess = "onFirmwareUpgradeSuccess",
    onFirmwareUpgradeFailure = "onFirmwareUpgradeFailure",
    onFirmwareUpgradeProgress = "onFirmwareUpgradeProgress",
    onFirmwareUpgradeStatus = "onFirmwareUpgradeStatus"
}
declare type TDeviceListenerOptions = {
    devId: string;
    type: DeviceListenerType;
};
export declare const addDeviceListener: ({ devId, type }: TDeviceListenerOptions, cb: (data: unknown) => void, onError?: ((e: unknown) => void) | undefined) => {
    remove: () => void;
};
export declare const removeAllDeviceListeners: () => void;
export {};
