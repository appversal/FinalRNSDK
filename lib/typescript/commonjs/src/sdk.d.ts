declare class AppStorys {
    private static instance;
    private campaigns;
    static getInstance(): AppStorys;
    trackScreen(app_id: string, screen_name: string): Promise<any[]>;
    trackUser(user_id: string, attributes?: any): Promise<void>;
    trackUserAction(user_id: string, campaign_id: string, action: any): Promise<void>;
    verifyUser(user_id: string, attributes?: any): Promise<{
        user_id: string;
        campaigns: any[];
    } | undefined>;
    verifyAccount(account_id: string, app_id: string): Promise<void>;
    static Stories: import("react").FC<import("./components/stories").StoriesProps>;
    static StoryScreen: import("react").FC<{}>;
    static Floater: import("react").FC<import("./components/floater").FloaterProps>;
    static Pip: import("react").FC<import("./components/pip").PipProps>;
    static Banner: import("react").FC<import("./components/banner").BannerProps>;
}
declare const _default: AppStorys;
export default _default;
//# sourceMappingURL=sdk.d.ts.map