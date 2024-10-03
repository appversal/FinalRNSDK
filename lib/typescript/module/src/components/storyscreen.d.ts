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
declare const StoryScreen: React.FC<StoriesProps>;
export default StoryScreen;
//# sourceMappingURL=storyscreen.d.ts.map