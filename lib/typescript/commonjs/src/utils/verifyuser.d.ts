interface Attributes {
    [key: string]: any;
}
export declare const verifyUser: (user_id: string, campaigns: any[], attributes?: Attributes) => Promise<{
    user_id: string;
    campaigns: any[];
} | undefined>;
export {};
//# sourceMappingURL=verifyuser.d.ts.map