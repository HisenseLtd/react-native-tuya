//
//  TuyaRNDeviceListener.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNDeviceListener.h"
#import <ThingSmartDeviceCoreKit/ThingSmartDevice.h>
#import <YYModel/YYModel.h>
#import "TuyaRNEventEmitter.h"

static inline BOOL TuyaRNDeviceListenTypeAvailable(TuyaRNDeviceListenType type) {
  return type < pow(2, 3) && type > 0;//1,2,4
}

@interface TuyaRNDeviceListener() <ThingSmartDeviceDelegate>

@property (nonatomic, strong) NSMutableArray<ThingSmartDevice *> *listenDeviceArr;

@property (nonatomic, strong) NSMutableDictionary<NSString *, NSNumber *> *listenTypeDic;

@end

@implementation TuyaRNDeviceListener

+ (instancetype)shareInstance {
  static TuyaRNDeviceListener *listenerInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    listenerInstance = [TuyaRNDeviceListener new];
  });
  return listenerInstance;
}

- (instancetype)init {
  if (self = [super init]) {
    _listenDeviceArr = [NSMutableArray new];
    _listenTypeDic = [NSMutableDictionary new];
  }
  return self;
}

+ (void)registerDevice:(ThingSmartDevice *)device type:(TuyaRNDeviceListenType)type {

  if (!TuyaRNDeviceListenTypeAvailable(type)) {
    return;
  }

  __block BOOL exist = NO;
  [[TuyaRNDeviceListener shareInstance].listenDevices enumerateObjectsUsingBlock:^(ThingSmartDevice * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    if ([obj.deviceModel.devId isEqualToString:device.deviceModel.devId]) {
      exist = YES;
      *stop = YES;
    }
  }];

  device.delegate = [TuyaRNDeviceListener shareInstance];

  TuyaRNDeviceListenType listenType = type;
  if (!exist) {
    if ([TuyaRNDeviceListener shareInstance].listenDeviceArr.count == 0) {
    }
    [[TuyaRNDeviceListener shareInstance].listenDeviceArr addObject:device];
  } else {
    NSNumber *currentType = [[TuyaRNDeviceListener shareInstance].listenTypeDic objectForKey:device.deviceModel.devId];
    if (currentType) {
      // 监听类型拼接
      listenType = [currentType unsignedIntegerValue] | listenType;
    }
  }
  [[TuyaRNDeviceListener shareInstance].listenTypeDic setObject:[NSNumber numberWithUnsignedInteger:listenType] forKey:device.deviceModel.devId];

}

+ (void)removeDevice:(ThingSmartDevice *)device type:(TuyaRNDeviceListenType)type {
  [self removeDeviceWithDeviceId:device.deviceModel.devId type:type];
}

+ (void)removeDeviceWithDeviceId:(NSString *)deviceId type:(TuyaRNDeviceListenType)type {

  if (!TuyaRNDeviceListenTypeAvailable(type)) {
    return;
  }

  TuyaRNDeviceListenType listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (!(listenType & type)) {
    return;
  }

  listenType = listenType & (!type);
  if (listenType != TuyaRNDeviceListenType_None) {
    [[TuyaRNDeviceListener shareInstance].listenTypeDic setObject:[NSNumber numberWithUnsignedInteger:listenType] forKey:deviceId];
  } else {
    [[TuyaRNDeviceListener shareInstance].listenTypeDic removeObjectForKey:deviceId];
    __block NSInteger deviceIdx = -1;
    [[TuyaRNDeviceListener shareInstance].listenDeviceArr enumerateObjectsUsingBlock:^(ThingSmartDevice * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      if ([obj.deviceModel.devId isEqualToString:deviceId]) {
        obj.delegate = nil;
        deviceIdx = idx;
        *stop = YES;
      }
    }];

    if (deviceIdx >= 0) {
      [[TuyaRNDeviceListener shareInstance].listenDeviceArr removeObjectAtIndex:deviceIdx];
      if ([TuyaRNDeviceListener shareInstance].listenDeviceArr.count == 0) {

      }
    }
  }
}


#pragma mark -
#pragma mark - delegate
/// 设备信息更新
- (void)deviceInfoUpdate:(ThingSmartDevice *)device {
  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }

  BOOL isOnline;
  if (device.onlineMode == 1) {
    isOnline = NO;
  } else {
    isOnline = YES;
  }

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {
    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"type": @"onDevInfoUpdate",
                          @"online": @(isOnline),
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }
}

/// 设备被移除
- (void)deviceRemoved:(ThingSmartDevice *)device {

  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {
    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"type": @"onRemoved"
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }
}

/// dp数据更新
- (void)device:(ThingSmartDevice *)device dpsUpdate:(NSDictionary *)dps {

  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }
  device.deviceModel.dps = dps;

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {

    if (!dps || ![dps isKindOfClass:[NSDictionary class]]) {
      return;
    }

    NSString *dpStr = [dps yy_modelToJSONString];

    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"dpStr": device.deviceModel.dps ? dpStr: @"",
                          @"type": @"onDpUpdate"
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }

}

- (void)device:(ThingSmartDevice *)device otaUpdateStatusChanged:(ThingSmartFirmwareUpgradeStatusModel *)statusModel {
  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {
    NSDictionary *statusModelDict = [self dictionaryFromStatusModel:statusModel];
    if (!statusModelDict) {
      return;
    }
    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"type": @"onFirmwareUpgradeStatus",
                          @"payload": statusModelDict
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }
}

/// 固件升级成功
- (void)deviceFirmwareUpgradeSuccess:(ThingSmartDevice *)device type:(NSInteger)type {
  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {
    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"type": @"onFirmwareUpgradeSuccess"
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }
}

/// 固件升级失败
- (void)deviceFirmwareUpgradeFailure:(ThingSmartDevice *)device type:(NSInteger)type {
  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {
    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"type": @"onFirmwareUpgradeFailure"
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }
}

/**
 *  固件升级进度
 *
 *  @param type     设备类型
 *  @param progress 升级进度
 */
- (void)device:(ThingSmartDevice *)device firmwareUpgradeProgress:(NSInteger)type progress:(double)progress {
  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {
    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"type": @"onFirmwareUpgradeProgress",
                          @"progress": [NSString stringWithFormat:@"%f", progress]
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }
}

// wifi信号强度回调
- (void)device:(ThingSmartDevice *)device signal:(NSString *)signal {

  NSString *deviceId = device.deviceModel.devId;
  if (!([deviceId isKindOfClass:[NSString class]] && deviceId.length > 0)) {
    return;
  }

  NSInteger listenType = [[TuyaRNDeviceListener shareInstance].listenTypeDic[deviceId] integerValue];
  if (listenType & TuyaRNDeviceListenType_DeviceInfo) {
    NSDictionary *dic = @{
                          @"devId": deviceId,
                          @"signal": signal,
                          @"type": @"onNetworkStatusChanged"
                          };
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterDeviceInfoEvent stringByAppendingFormat:@"//%@", deviceId] withBody:dic];
  }
}

- (NSDictionary *)dictionaryFromStatusModel:(ThingSmartFirmwareUpgradeStatusModel *)statusModel {
  if (![statusModel isKindOfClass:[ThingSmartFirmwareUpgradeStatusModel class]]) {
    return nil;
  }

  NSMutableDictionary *dict = [NSMutableDictionary dictionary];

  // Add all fields from statusModel to the dictionary
  dict[@"upgradeStatus"] = @(statusModel.upgradeStatus); // Assuming this is an enum or integer
  dict[@"statusText"] = statusModel.statusText ?: @"";
  dict[@"statusTitle"] = statusModel.statusTitle ?: @"";
  dict[@"progress"] = statusModel.progress >= 0 ? @(statusModel.progress) : @(0); // Ignore values < 0
  dict[@"type"] = @(statusModel.type);
  dict[@"upgradeMode"] = @(statusModel.upgradeMode); // Assuming this is an enum or integer

  // Handle NSError
  if (statusModel.error) {
    dict[@"error"] = @{
      @"code": @(statusModel.error.code),
      @"description": statusModel.error.localizedDescription ?: @""
    };
  } else {
    dict[@"error"] = [NSNull null]; // No error
  }

  return [dict copy];
}

@end
