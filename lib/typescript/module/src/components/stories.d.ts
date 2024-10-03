import React from 'react';
interface StoryGroup {
    ringColor: string;
    thumbnail: string;
    name: string;
}
export interface StoriesProps {
    data: {
        id: string;
        details: StoryGroup[];
    };
}
declare const Stories: React.FC<StoriesProps>;
export default Stories;
//# sourceMappingURL=stories.d.ts.map