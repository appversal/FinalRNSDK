import React from 'react';
export interface PipProps {
    data: {
        id: string;
        details: {
            small_video: string;
            large_video: string;
            link: string;
        };
    };
    user_id: string;
    access_token: string;
}
declare const Pip: React.FC<PipProps>;
export default Pip;
//# sourceMappingURL=pip.d.ts.map