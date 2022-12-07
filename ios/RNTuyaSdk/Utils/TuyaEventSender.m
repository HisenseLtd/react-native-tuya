//
//  TuyaEventSender.m
//  RNTuyaSdk
//
//  Created by Yakiv Vakoliuk on 06.12.2022.
//

#import "TuyaEventSender.h"

NSString *const tuyaEventSenderScanLEEvent = @"ON_SCAN_BEAN_EVENT";

@implementation TuyaEventSender
{
  bool hasListeners;
}

RCT_EXPORT_MODULE(TuyaEventSender);

+ (id)allocWithZone:(NSZone *)zone {
  static TuyaEventSender *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[tuyaEventSenderScanLEEvent];
}

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
  // Remove upstream listeners, stop unnecessary background tasks
}

-(bool)hasListeners {
  return hasListeners;
}

- (void)sendEvent2RN:(NSString *)event body:(id)body
{
  if (hasListeners) {
    [self sendEventWithName:event body:body];
  }
}

@end
