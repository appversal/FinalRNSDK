"use strict";

import { trackUser } from "./utils/trackuser.js";
import { UserActionTrack } from "./utils/trackuseraction.js";
import { verifyUser } from "./utils/verifyuser.js";
import { verifyAccount } from "./utils/verifyaccount.js";
import { trackScreen } from "./utils/screen.js";
import Banner from "./components/banner.js";
import Floater from "./components/floater.js";
import Pip from "./components/pip.js";
import Stories from "./components/stories.js";
import { StoryScreen } from "./components/storyscreen.js";
class AppStorys {
  campaigns = [];
  static getInstance() {
    if (!AppStorys.instance) {
      AppStorys.instance = new AppStorys();
    }
    return AppStorys.instance;
  }
  async trackScreen(app_id, screen_name) {
    this.campaigns = await trackScreen(app_id, screen_name);
    return this.campaigns;
  }
  async trackUser(user_id, attributes) {
    return await trackUser(user_id, attributes);
  }
  async trackUserAction(user_id, campaign_id, action) {
    return await UserActionTrack(user_id, campaign_id, action);
  }
  async verifyUser(user_id, attributes) {
    return await verifyUser(user_id, this.campaigns, attributes);
  }
  async verifyAccount(account_id, app_id) {
    return await verifyAccount(account_id, app_id);
  }
  static Stories = Stories;
  static StoryScreen = StoryScreen;
  static Floater = Floater;
  static Pip = Pip;
  static Banner = Banner;
}
export default new AppStorys();
//# sourceMappingURL=sdk.js.map