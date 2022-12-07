//
//  TuyaEventSender.h
//  Pods
//
//  Created by Yakiv Vakoliuk on 06.12.2022.
//

#ifndef TuyaEventSender_h
#define TuyaEventSender_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

extern NSString *const tuyaEventSenderScanLEEvent;

@interface TuyaEventSender : RCTEventEmitter<RCTBridgeModule>

- (void)sendEvent2RN:(NSString *)event body:(id)body;
- (bool)hasListeners;

@end

#endif
