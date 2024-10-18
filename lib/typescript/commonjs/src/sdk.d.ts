export type StoryGroup = {
    ringColor: string;
    thumbnail: string;
    name: string;
};
export type StoryGroupData = {
    ringColor: string;
    thumbnail: string;
    name: string;
};
export type CampaignFloater = {
    id: string;
    campaign_type: 'FLT';
    details: {
        id: string;
        image: string;
        link: string | null;
    };
};
export type CampaignStory = {
    id: string;
    campaign_type: 'STR';
    details: [
        {
            id: string;
            name: string;
            thumbnail: string;
            ringColor: string;
            order: number;
            slides: [
                {
                    id: string;
                    parent: string;
                    image: null | string;
                    video: null | string;
                    link: null | string;
                    button_text: null | string;
                    order: number;
                    content: string | null;
                }
            ];
        }
    ];
};
export type CampaignBanner = {
    id: string;
    campaign_type: 'BAN';
    details: {
        id: string;
        image: string;
        width: null | number;
        height: null | number;
        link: null | string;
    };
};
export type CampaignPip = {
    id: string;
    campaign_type: 'PIP';
    details: {
        small_video: string;
        large_video: string;
        link: string | null;
        campaign: string;
        screen: number;
        redirectedTo: null | string;
    };
};
export type UserData = {
    campaigns: Array<CampaignFloater | CampaignStory | CampaignBanner | CampaignPip>;
    user_id: string;
};
declare class AppStorys {
    private static instance;
    private campaigns;
    static getInstance(): AppStorys;
    trackScreen(app_id: string, screen_name: string): Promise<any[]>;
    trackUser(user_id: string, attributes?: any): Promise<void>;
    trackUserAction(user_id: string, campaign_id: string, action: any): Promise<void>;
    verifyUser(user_id: string, attributes?: any): Promise<UserData | undefined>;
    verifyAccount(account_id: string, app_id: string): Promise<void>;
    static Stories: import("react").FC<UserData>;
    static StoryScreen: () => import("react/jsx-runtime").JSX.Element;
    static Floater: import("react").FC<import("./components/floater").FloaterProps>;
    static Pip: import("react").FC<import("./components/pip").PipProps>;
    static Banner: import("react").FC<import("./components/banner").BannerProps>;
}
declare const _default: AppStorys;
export default _default;
//# sourceMappingURL=sdk.d.ts.map