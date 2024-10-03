import React from 'react';
export interface BannerProps {
    data: {
        id: string;
        details: {
            image: string;
            link: string;
        };
    };
    user_id: string;
    access_token: string;
}
declare const Banner: React.FC<BannerProps>;
export default Banner;
//# sourceMappingURL=banner.d.ts.map