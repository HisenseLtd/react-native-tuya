//
//  TuyaBLERNScannerModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaBLERNScannerModule.h"
#import <TuyaSmartActivatorKit/TuyaSmartActivatorKit.h>
#import <TuyaSmartBaseKit/TuyaSmartBaseKit.h>
#import <TuyaSmartDeviceKit/TuyaSmartDeviceKit.h>
#import <TuyaSmartBLEKit/TuyaSmartBLEManager+Biz.h>
#import "TuyaRNUtils+Network.h"
#import "YYModel.h"
#import "TuyaEventSender.h"

// Bluetooth Pairing
static TuyaBLERNScannerModule * scannerInstance = nil;

@interface TuyaBLERNScannerModule()<TuyaSmartBLEManagerDelegate>

@property(copy, nonatomic) RCTPromiseResolveBlock promiseResolveBlock;
@property(copy, nonatomic) RCTPromiseRejectBlock promiseRejectBlock;

@end

@implementation TuyaBLERNScannerModule

RCT_EXPORT_MODULE(TuyaBLEScannerModule)

RCT_EXPORT_METHOD(startBluetoothScan:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  if (scannerInstance == nil) {
    scannerInstance = [TuyaBLERNScannerModule new];
  }

  [TuyaSmartBLEManager sharedInstance].delegate = scannerInstance;
  scannerInstance.promiseResolveBlock = resolver;
  scannerInstance.promiseRejectBlock = rejecter;

  [[TuyaSmartBLEManager sharedInstance] startListening:YES];
}

- (void)didDiscoveryDeviceWithDeviceInfo:(TYBLEAdvModel *)deviceInfo {
  TuyaEventSender * eventSender = [TuyaEventSender allocWithZone: nil];
  [eventSender sendEvent2RN:tuyaEventSenderScanLEEvent body:[deviceInfo yy_modelToJSONObject]];

  if (scannerInstance.promiseResolveBlock) {
    self.promiseResolveBlock([deviceInfo yy_modelToJSONObject]);
  }
}

RCT_EXPORT_METHOD(startBluetoothLEScan:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  if (scannerInstance == nil) {
    scannerInstance = [TuyaBLERNScannerModule new];
  }
  [TuyaSmartBLEManager sharedInstance].delegate = scannerInstance;
  [[TuyaSmartBLEManager sharedInstance] startListening:YES];
  resolver(@"true");
}

RCT_EXPORT_METHOD(stopBluetoothScan:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  [[TuyaSmartBLEManager sharedInstance] stopListening:YES];
}

@end
