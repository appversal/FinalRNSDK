import React from 'react';
export interface FloaterProps {
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
declare const Floater: React.FC<FloaterProps>;
export default Floater;
//# sourceMappingURL=floater.d.ts.map