"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _trackuser = require("./utils/trackuser.js");
var _trackuseraction = require("./utils/trackuseraction.js");
var _verifyuser = require("./utils/verifyuser.js");
var _verifyaccount = require("./utils/verifyaccount.js");
var _screen = require("./utils/screen.js");
var _banner = _interopRequireDefault(require("./components/banner.js"));
var _floater = _interopRequireDefault(require("./components/floater.js"));
var _pip = _interopRequireDefault(require("./components/pip.js"));
var _stories = _interopRequireDefault(require("./components/stories.js"));
var _storyscreen = require("./components/storyscreen.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AppStorys {
  campaigns = [];
  static getInstance() {
    if (!AppStorys.instance) {
      AppStorys.instance = new AppStorys();
    }
    return AppStorys.instance;
  }
  async trackScreen(app_id, screen_name) {
    this.campaigns = await (0, _screen.trackScreen)(app_id, screen_name);
    return this.campaigns;
  }
  async trackUser(user_id, attributes) {
    return await (0, _trackuser.trackUser)(user_id, attributes);
  }
  async trackUserAction(user_id, campaign_id, action) {
    return await (0, _trackuseraction.UserActionTrack)(user_id, campaign_id, action);
  }
  async verifyUser(user_id, attributes) {
    return await (0, _verifyuser.verifyUser)(user_id, this.campaigns, attributes);
  }
  async verifyAccount(account_id, app_id) {
    return await (0, _verifyaccount.verifyAccount)(account_id, app_id);
  }
  static Stories = _stories.default;
  static StoryScreen = _storyscreen.StoryScreen;
  static Floater = _floater.default;
  static Pip = _pip.default;
  static Banner = _banner.default;
}
var _default = exports.default = new AppStorys();
//# sourceMappingURL=sdk.js.map