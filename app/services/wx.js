const { default: Axios } = require('axios');
const util = require('util');
const { generateToken } = require('../../core/util');
const Auth = require('../../middlewares/auth');
const {User} = require('../models/user');
class WXManager {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appID,
            global.config.wx.appSecret,
            code);
        const result = await Axios.get(url);
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败');
        }
        const errcode = result.data.errcode;
        if (+result.data.errcode !== 0) {
        throw new global.errs.AuthFailed('openid获取失败' + errcode)
        }

        const user  = await User.getUserByOpenid(result.data.openid);
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = WXManager;