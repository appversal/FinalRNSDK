
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAppstorysReactNativeSpec.h"

@interface AppstorysReactNative : NSObject <NativeAppstorysReactNativeSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AppstorysReactNative : NSObject <RCTBridgeModule>
#endif

@end
